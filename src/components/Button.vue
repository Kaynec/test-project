<template>
  <button
    :class="generateVariantClasses()"
    class="hover:opacity-90 flex items-center justify-center gap-3 transition-250 transition-all rounded-lg py-2 px-4"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
const { variant = "primary" } = defineProps<{
  variant?: string;
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
