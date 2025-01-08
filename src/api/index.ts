import { createFetch } from "@vueuse/core";
const useFetch = createFetch({
  baseUrl: "https://interview.cetri.ir",
  options: {
    async beforeFetch({ options }) {
      const myToken = "token";
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
