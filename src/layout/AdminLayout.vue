<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
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
  <RouterView />
</template>
