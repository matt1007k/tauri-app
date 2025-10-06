<script setup lang="ts">
import { platform } from "@tauri-apps/plugin-os";
import { RouterLink, RouterView } from "vue-router";
import { isDesktop } from "./util/is-desktop";
import { onMounted } from "vue";
onMounted(() => {
  if (window.__TAURI_OS_PLUGIN_INTERNALS__) {
    console.log("OS", ["linux", "macos", "windows"].includes(platform()));
    console.log("is Desktop", isDesktop);
  }
});
</script>

<template>
  <div :class="{ 'py-8': !isDesktop }">
    <router-view />
  </div>
</template>
