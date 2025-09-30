import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

import { router } from "./router";
import "./app.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueQueryPlugin).mount("#app");
