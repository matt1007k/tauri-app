<script setup lang="ts">
import { useRoute } from "vue-router";
import { Post } from "../models/post";
import { useQuery } from "@tanstack/vue-query";

const { params } = useRoute();

const { data: post, isLoading } = useQuery<Post>({
  queryKey: ["todo", params.id],
  queryFn: () =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`).then(
      (res) => res.json()
    ),
});
</script>
<template>
  <main class="px-5">
    <div
      class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4"
      v-if="isLoading"
    >
      <div class="flex animate-pulse space-x-4">
        <div class="size-10 rounded-full bg-gray-200"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 rounded bg-gray-200"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 rounded bg-gray-200"></div>
              <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div class="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-3xl font-bold" v-if="post">
      {{ post.title }} - {{ params.id }}
    </h1>
    <p class="leading-normal p-10 text-xl" v-if="post">
      {{ post.body }}
    </p>
  </main>
</template>
