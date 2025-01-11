<template>
  <main class="flex items-center">
    <Card>
      <span class="font-bold text-2xl">خوش آمدید</span>

      <p class="text-primary-text">
        برای ورود ایمیل و رمز عبور خودرا وارد کنید
      </p>
      <form @submit.prevent="signup" class="space-y-4">
        <TextField
          type="email"
          placeholder="ایمیل شما"
          v-model="body.email"
          v-model:error="errors.email"
        >
          <template #prepend>
            <InboxIcon class="size-6" />
          </template>
        </TextField>
        <TextField
          :type="isLocked ? 'password' : 'text'"
          placeholder="رمز عبور"
          v-model="body.password"
          v-model:error="errors.password"
        >
          <template #prepend>
            <LockClosedIcon class="size-6" />
          </template>
          <template #append>
            <button type="button" @click="isLocked = !isLocked">
              <EyeSlashIcon v-if="isLocked" class="size-6" />
              <EyeIcon v-else class="size-6" />
            </button>
          </template>
        </TextField>
        <Button :loading="isLoading" class="my-2 w-full" type="submit">
          ورود
        </Button>
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

import { myFetch } from "@/api";
import { useRouter } from "vue-router";
import {
  InboxIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/vue/24/outline";

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

const isLoading = ref(false);

const router = useRouter();
async function signup() {
  console.log(body.value);
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

  isLoading.value = true;

  try {
    const data = await myFetch<SignupResponseBody>("/main/main/signup", {
      method: "post",
      body: body.value,
    });

    if (!data?.ok || !data.data.access) return;
    store.setAccessToken(data.data?.access);
    store.setRefreshToken(data.data?.refresh);
  } catch (error) {
    const e = error as any;

    isLoading.value = false;

    if (e) {
      errors.value.email = e;
      return;
    }
  }

  router.replace("/");
}
</script>
