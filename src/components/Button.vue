<template>
  <button
    :class="generateVariantClasses()"
    class="hover:opacity-90 flex items-center justify-center gap-3 transition-250 transition-all rounded-lg py-2 px-4"
    :disabled="loading"
  >
    <span v-if="loading" class="loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
const { variant = "primary", loading = false } = defineProps<{
  variant?: string;
  loading?: boolean;
}>();

function generateVariantClasses() {
  switch (variant) {
    case "simple":
      return "text-secondary";

    default:
      return "bg-primary text-white font-bold";
  }
}
</script>

<style scoped>
.loader {
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
