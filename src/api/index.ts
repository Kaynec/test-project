import { ref } from "vue";

const baseUrl = "https://interview.cetri.ir";

let shouldRefresh = true; // Flag to notify on error

export async function setNewToken(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      // If there is no refresh token, redirect to login
      // window.location.href = "/login";
      reject("No refresh token found");
      return;
    }

    // Use the custom useFetch to refresh the token
    try {
      const res = await fetch(
        `${baseUrl}/main/main/refresh?token=${refreshToken}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      // Store the new token in local storage
      localStorage.setItem("accessToken", data.data.access);
      resolve(data.data.access);
    } catch (error) {
      console.error("Error refreshing token:", error);

      // If refreshing fails, clear tokens and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // window.location.href = "/login";
      reject("Unable to get a new token");
      return;
    }
  });
}

async function getResponse<T>(response: Response, type: string) {
  // Parse response based on requested type
  if (type == "text") {
    return (await response.text()) as unknown as T;
  }
  if (type == "blob") {
    return (await response.blob()) as unknown as T;
  }

  // Default to JSON parsing
  return (await response.json()) as T;
}

export function myFetch<T>(
  url: string,
  options: Omit<RequestInit, "body"> & {
    json?: boolean;
    text?: boolean;
    blob?: boolean;
    body?: any;
    immidiate?: boolean;
  } = {}
): Promise<T> {
  url = `${baseUrl}${url}`;

  // Prepare headers
  const headers = (options.headers ?? {}) as Record<string, any>;
  if (!headers["content-type"]) {
    headers["content-type"] = "application/json";
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }
  }
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken && !url.includes("signup")) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const getResp = async (res: Response): Promise<T> => {
    // Parse response based on requested type
    if (options.text) {
      return await getResponse(res, "text");
    }
    if (options.blob) {
      return await getResponse(res, "blob");
    }
    return await getResponse(res, "json");
  };

  return new Promise((resolve, reject) => {
    fetch(url, { ...options, headers })
      .then(async (res) => {
        if (!res.ok) {
          // Handle HTTP errors
          if (res.status === 403) {
            if (!shouldRefresh) return res;

            // if refresh errors it means refresh token also gone bad
            shouldRefresh = false;

            try {
              await setNewToken(); // Attempt to refresh the token
              accessToken = localStorage.getItem("accessToken");
            } catch (e) {
              // error.value = "cant refresh token";
              reject("can't refresh data xo xo");
            }

            headers["Authorization"] = `Bearer ${accessToken}`;
            const retryResponse = await fetch(url, { ...options, headers });
            // response.value = retryResponse;

            if (!retryResponse.ok) {
              reject(`HTTP error! Status: ${retryResponse.status}`);
            }

            resolve((await getResp(res)) as T);
          }
        }
        resolve(await getResp(res)) as T;
      })
      .catch((e) => {
        reject(e ?? "cant fetch your data");
      });
  });
}

export function useFetch<T>(
  url: string,
  options: Omit<RequestInit, "body"> & {
    json?: boolean;
    text?: boolean;
    blob?: boolean;
    body?: any;
    immidiate?: boolean;
  } = {}
) {
  const data = ref<T>();
  const error = ref(false);
  const isFetching = ref(true);

  isFetching.value = true;
  myFetch(url, options)
    .then((r) => {
      data.value = r as T;
    })
    .catch((e) => {
      error.value = e;
    })
    .finally(() => {
      isFetching.value = false;
    });

  return {
    data,
    error,
    isFetching,
  };
}
