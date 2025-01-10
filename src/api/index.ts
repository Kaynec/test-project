import { SignupResponseBody } from "@/types";
import { AfterFetchContext, BeforeFetchContext } from "@vueuse/core";
import { ref } from "vue";

let isRefreshing = false; // Flag to track if a refresh request is in progress

async function setNewToken(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      // If there is no refresh token, redirect to login
      window.location.href = "/login";
      reject("No refresh token found");
      return;
    }

    // Use the custom useFetch to refresh the token
    const { data, error } = await useFetch<SignupResponseBody>(
      `https://interview.cetri.ir/main/main/refresh?token=${refreshToken}`,
      {
        method: "POST",
      }
    );

    if (error.value || !data.value) {
      console.error("Error refreshing token:", error.value);

      // If refreshing fails, clear tokens and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      reject("Unable to get a new token");
      return;
    }

    // Store the new token in local storage
    localStorage.setItem("accessToken", data.value.data.access);
    resolve(data.value.data.access);
  });
}

export function useFetch<T>(
  url: string,
  options: RequestInit & {
    json?: boolean;
    text?: boolean;
    blob?: boolean;
  } = {}
) {
  const data = ref<T>();
  const error = ref();
  const isFetching = ref(true);
  const response = ref<Response>();

  // Prepare headers
  const headers = (options.headers ?? {}) as Record<string, any>;
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken && !url.includes("signup")) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  fetch(url, { ...options, headers })
    .then(async (res) => {
      response.value = res;

      if (!res.ok) {
        // Handle HTTP errors
        if (res.status === 403) {
          if (!isRefreshing) {
            isRefreshing = true; // Set the flag to indicate a refresh is in progress

            try {
              await setNewToken(); // Attempt to refresh the token
              let accessToken = localStorage.getItem("accessToken");
            } catch (error) {
              throw new Error("Failed to refresh token");
            } finally {
              isRefreshing = false; // Reset the flag after refreshing
            }
          }

          // Wait for the new token and retry the original request
          return new Promise(async (resolve) => {
            headers["Authorization"] = `Bearer ${accessToken}`;
            const retryResponse = await fetch(url, { ...options, headers });
            response.value = retryResponse;

            if (!retryResponse.ok) {
              throw new Error(`HTTP error! Status: ${retryResponse.status}`);
            }

            data.value = (await retryResponse.json()) as T; // Parse JSON data
            resolve(data.value);
          });
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Parse response based on requested type
      if (options.text) {
        data.value = (await res.text()) as unknown as T;
        return;
      }
      if (options.blob) {
        data.value = (await res.blob()) as unknown as T;
        return;
      }

      // Default to JSON parsing
      data.value = (await res.json()) as T;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      isFetching.value = false;
    });

  return {
    data,
    error,
    isFetching,
    response,
  };
}
