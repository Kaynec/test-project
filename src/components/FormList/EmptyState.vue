<template>
  <div class="flex items-center">
    <p class="text-primary-text">{{ message }}</p>
    <RouterLink v-if="actionLink" :to="actionLink">
      <Button variant="simple">{{ actionText }}</Button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";

defineProps<{
  message: string;
  actionText: string;
  actionLink: string;
}>();
</script>
