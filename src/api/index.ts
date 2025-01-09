import { createFetch } from "@vueuse/core";
export const useFetch = createFetch({
  baseUrl: "https://interview.cetri.ir",
  options: {
    async beforeFetch({ options }) {
      const myToken = localStorage.getItem("token");
      if (!myToken) {
        return;
      }
      if (options.headers) {
        (options.headers as any)["Authorization"] = `Bearer ${myToken}`;
      }

      return { options };
    },
    async afterFetch(ctx) {
      return ctx;
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});
