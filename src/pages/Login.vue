<template>
  <main>
    <Card>
      <span class="font-bold text-2xl">خوش آمدید</span>

      <p class="text-primary-text">
        برای ورود ایمیل و رمز عبور خودرا وارد کنید
      </p>
      <form @submit.prevent="signup">
        <TextField
          placeholder="ایمیل شما"
          v-model="body.email"
          v-model:error="errors.email"
        >
          <template #prepend>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
            </svg>
          </template>
        </TextField>
        <TextField
          :type="isLocked ? 'password' : 'text'"
          placeholder="رمز عبور"
          v-model="body.password"
          v-model:error="errors.password"
        >
          <template #prepend>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </template>
          <template #append>
            <button type="button" @click="isLocked = !isLocked">
              <svg
                v-if="isLocked"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          </template>
        </TextField>
        <Button class="my-2 w-full" type="submit"> ورود </Button>
      </form>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { useGlobalState } from "../composables/store";
import { type SignupResponseBody } from "../types";
import { ref } from "vue";
import Button from "../components/Button.vue";
import TextField from "../components/TextField.vue";
import Card from "../components/Card.vue";

import { useFetch } from "../api/index";

const store = useGlobalState();

const isLocked = ref(true);

const body = ref({
  email: "",
  password: "",
});
const errors = ref({
  email: "",
  password: "",
});

async function signup() {
  if (!body.value.email.length) {
    errors.value.email = "لطفا ایمیل خود را وارد کنید";
    return;
  } else if (!body.value.password.length) {
    errors.value.password = "لطفا رمز عبور خود را وارد کنید";
    return;
  }
  const emailRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./]).{8,}$/;
  if (!emailRegex.test(body.value.password)) {
    errors.value.password = "رمز عبور باید شامل حروف و اعداد باشد";
    console.log(errors.value);
    return;
  }
  // else if password regex not good
  const { error, data } = await useFetch<SignupResponseBody>(
    "/main/main/signup"
  )
    .post(body)
    .json();

  if (error.value) {
    errors.value.email = error.value;
    return;
  }

  if (!data.value?.ok || !data.value.data.access) return;
  store.setAccessToken(data.value.data?.access);
  store.setRefreshToken(data.value.data?.refresh);
}
</script>
