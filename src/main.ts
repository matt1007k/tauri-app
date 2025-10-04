import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import ToastService from "primevue/toastservice";

import { router } from "./router";
import "./app.css";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(ToastService)
  .mount("#app");
