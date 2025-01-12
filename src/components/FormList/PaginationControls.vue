<template>
  <div class="flex items-center gap-6 justify-center">
    <Button
      :disabled="currentPage <= 1"
      class="border-2 border-gray-100"
      variant="transparent"
      @click="$emit('changePage', currentPage - 1)"
    >
      <ChevronRightIcon class="size-4" />
    </Button>
    <span class="text-primary-text"
      >صفحه {{ currentPage }} از {{ totalPages }}</span
    >
    <Button
      class="border-2 border-gray-100"
      :disabled="currentPage >= totalPages"
      variant="transparent"
      @click="$emit('changePage', currentPage + 1)"
    >
      <ChevronLeftIcon class="size-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
defineProps<{
  currentPage: number;
  totalPages: number;
}>();
</script>
