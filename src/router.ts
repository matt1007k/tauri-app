import "vue-router";

import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";
import NotFound from "./pages/NotFound.vue";
import PostDetail from "./pages/PostDetail.vue";
import About from "./pages/About.vue";
import AuthLayout from "./layout/AuthLayout.vue";
import AdminLayout from "./layout/AdminLayout.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("./pages/Home.vue"),
      },
      {
        path: "/about",
        name: "About",
        component: About,
        meta: { requiresAuth: false, hasRolesGuard: ["product:view"] },
      },
      {
        path: "/posts/:id",
        name: "PostDetail",
        component: PostDetail,
        meta: { requiresAuth: false, hasRolesGuard: ["product:create"] },
      },
    ],
  },

  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("./pages/auth/Login.vue"),
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // to.matched.some(record => record.meta.requiresAuth)
  const auth = {
    isLoggedIn: () => {
      return true;
    },
  };
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    return {
      path: "/auth/login",
      query: { redirect: to.fullPath },
    };
  }
});

router.beforeEach((to, from) => {
  if (typeof to.meta.hasRolesGuard === "undefined") {
    return true;
  }

  return ["product:create"].some((role) =>
    to.meta.hasRolesGuard?.includes(role)
  );
});
declare module "vue-router" {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean;
    // must be declared by every route
    requiresAuth: boolean;
    hasRolesGuard?: string[];
  }
}

export default router;
