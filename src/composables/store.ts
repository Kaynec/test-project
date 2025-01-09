import { createGlobalState } from "@vueuse/core";
import { ref } from "vue";

export const useGlobalState = createGlobalState(() => {
  const accessToken = ref("");
  const refreshToken = ref("");

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  function setAccessToken(newToken: string) {
    localStorage.setItem("accessToken", newToken);
    accessToken.value = newToken;
  }

  function getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  function setRefreshToken(newToken: string) {
    localStorage.setItem("refreshToken", newToken);
    refreshToken.value = newToken;
  }

  return {
    accessToken,
    getAccessToken,
    setAccessToken,
    refreshToken,
    getRefreshToken,
    setRefreshToken,
  };
});
