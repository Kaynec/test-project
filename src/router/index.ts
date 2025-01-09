import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";

import Default from "../pages/index.vue";
import Login from "../pages/login.vue";

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: Default,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
router.beforeEach((to, from) => {
  // in real world this might be way more complex
  const haveAuth = !!localStorage.getItem("accessToken");
  const needsAuth = to.meta.requiresAuth; // Assuming you have 'requiresAuth' in your route meta

  if (!needsAuth && haveAuth) {
    // User is authenticated but the route doesn't require authentication
    // Allow navigation to proceed
    if (from.path !== to.path) {
      return from.path;
    }
  }

  if (needsAuth && !haveAuth) {
    // User is not authenticated but the route requires authentication
    // Redirect to login
    if (to.path !== from.path) {
      return "/login";
    }
  }
});

export default router;
