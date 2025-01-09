<template>
  <main class="w-[90vw] max-w-[90rem] space-y-4">
    <div class="flex justify-between">
      <span class="font-bold text-xl">فرم ها</span>
      <Button>
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
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
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
</script>
