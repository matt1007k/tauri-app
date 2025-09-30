<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { Post } from "../models/post";

const posts = ref<Post[]>([]);
onMounted(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((res) => {
      posts.value = res;
    })
    .catch(console.error);
});
</script>

<template>
  <main class="px-5">
    <h1 class="text-3xl font-bold">Home</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde commodi esse
      pariatur ad saepe nesciunt. Ad aspernatur cumque vitae sapiente.
    </p>
    <div class="space-y-3">
      <RouterLink
        :to="{ name: 'PostDetail', params: { id: post.id } }"
        v-for="post in posts"
        :key="post.id"
        class="p-4 bg-gray-800 rounded-2xl flex text-white"
      >
        <h4 class="text-bold">{{ post.title }}</h4>
      </RouterLink>
    </div>
  </main>
</template>
