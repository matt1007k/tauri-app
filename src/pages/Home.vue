<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue/usetoast";

import { Post } from "../models/post";
import icon from "../assets/vue.svg";
import { Button, Message, Password, InputText, Toast } from "primevue";
import { FormField, Form, FormSubmitEvent } from "@primevue/forms";

const posts = ref<Post[]>([]);

onMounted(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((res) => {
      posts.value = res;
    })
    .catch(console.error);
  if (typeof Notification === "undefined") {
    console.log("Browser does not support the Notification API.");
    return;
  }

  const showNotification = () => {
    new Notification("Tauri App", { body: "Notification API", icon: icon });
  };

  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
});
const text_env = import.meta.env.VITE_TEST_TEXT;

const toast = useToast();
const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(8, { message: "Maximum 8 characters." })
    .refine((value) => /[a-z]/.test(value), {
      message: "Must have a lowercase letter.",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Must have an uppercase letter.",
    })
    .refine((value) => /d/.test(value), {
      message: "Must have a number.",
    }),
});

const resolver = zodResolver(schema);
type FormData = z.infer<typeof schema>;
// { valid, data }: { valid: boolean; data: FormData }
const onFormSubmit = ({ valid, values }: FormSubmitEvent) => {
  const formData = values as FormData;
  console.log(formData);

  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>

<template>
  <main class="px-5">
    <h1 class="text-3xl font-bold">Home</h1>
    <div class="card flex justify-center">
      <Toast />
      <Form
        :resolver
        @submit="onFormSubmit($event)"
        class="flex flex-col gap-4 w-full sm:w-56"
      >
        <FormField
          v-slot="$field"
          as="section"
          name="username"
          initialValue=""
          class="flex flex-col gap-2"
        >
          <InputText type="text" placeholder="Username" />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <section class="flex flex-col gap-2">
            <Password
              type="text"
              placeholder="Password"
              :feedback="false"
              toggleMask
              fluid
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </section>
        </FormField>
        <Button type="submit" severity="secondary" label="Submit" />
      </Form>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde commodi esse
      pariatur ad saepe nesciunt. Ad aspernatur cumque vitae sapiente.
    </p>

    <p>{{ text_env }}</p>
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
