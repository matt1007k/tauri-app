import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import ToastService from "primevue/toastservice";

import router from "./router";
import "./app.css";
import hasRole from "./directives/has-role";

const pinia = createPinia();

const app = createApp(App);

app.directive("has-role", hasRole);
app.directive("color", (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value;
});

app
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
