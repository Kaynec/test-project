<template>
  <main class="w-[90vw] max-w-[90rem] space-y-4">
    {{ error }}
    {{ data }}
    {{ isFetching }}

    <div class="flex justify-between">
      <span class="font-bold text-xl">فرم ها</span>
      <Button>
        <PlusIcon class="size-6" />
        <span> ایجاد فرم </span>
      </Button>
    </div>

    <Card>
      <div
        class="h-[85svh] max-h-[45rem] flex items-center justify-center gap-4"
      >
        <p class="text-primary-text">تا به حال فرمی ساخته نشده است!</p>
        <RouterLink to="/form">
          <Button variant="simple"> ایجاد فرم </Button>
        </RouterLink>
      </div>
    </Card>
  </main>
</template>
<script setup lang="ts">
import { setNewToken, useFetch } from "@/api";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";

const { error, data, isFetching } = useFetch(`/main/main/forms`);
setNewToken();
</script>
