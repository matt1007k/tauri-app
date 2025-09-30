import { createMemoryHistory, createRouter } from "vue-router";
import NotFound from "./pages/NotFound.vue";
import PostDetail from "./pages/PostDetail.vue";
import About from "./pages/About.vue";
import Home from "./pages/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/posts/:id", name: "PostDetail", component: PostDetail },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
