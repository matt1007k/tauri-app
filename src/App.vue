<script setup lang="ts">
import { platform } from "@tauri-apps/plugin-os";
import { RouterLink, RouterView } from "vue-router";
import { isDesktop } from "./util/is-desktop";
import { onMounted } from "vue";
onMounted(() => {
  console.log("OS", ["linux", "macos", "windows"].includes(platform()));
  console.log("is Desktop", isDesktop);
});
</script>

<template>
  <div :class="{ 'pb-10': !isDesktop }">
    <nav class="flex gap-4 items-center">
      <RouterLink
        to="/"
        exactActiveClass="border-b-2 border-indigo-700"
        class="text-white border-b-0"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/about"
        exactActiveClass="border-b-2 border-indigo-700"
        class="text-white border-b-0"
      >
        About
      </RouterLink>
      <RouterLink
        to="/not"
        exactActiveClass="border-b-2 border-indigo-700"
        class="text-white border-b-0"
      >
        Not Exists
      </RouterLink>
    </nav>
    <router-view />
  </div>
</template>
