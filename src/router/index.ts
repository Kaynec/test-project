import { createMemoryHistory, createRouter } from "vue-router";

import DefaultPage from "../pages/index.vue";

const routes = [{ path: "/", component: DefaultPage }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export default router;
