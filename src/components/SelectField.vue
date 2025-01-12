<template>
  <!-- Margin for ofsetting the error height -->
  <div class="relative mt-2">
    <label class="">
      {{ label }}
    </label>
    <div class="relative">
      <div @click="" class="absolute top-1/2 -translate-y-1/2 left-0 pl-2">
        <slot name="append"></slot>
      </div>
      <div @click="" class="absolute top-1/2 -translate-y-1/2 right-0 pr-2">
        <slot name="prepend"></slot>
      </div>
      <select
        class="select-with-arrow disabled:bg-slate-200 block p-3 px-8 w-full border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 appearance-none"
        v-model="selected"
        v-bind="$attrs"
        @change="error = ''"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          :class="{ hidden: option.hidden }"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <p class="py-2 text-xs font-bold text-red-600">
      {{ error ? error : "" }}
    </p>
  </div>
</template>

<script setup lang="ts">
const selected = defineModel({ required: true });
const error = defineModel("error", { required: true });

defineProps<{
  label?: string;
  options: { label: string; hidden?: boolean; value: string | number }[];
}>();
</script>

<style scoped>
/* Add custom arrow to the select */
.select-with-arrow {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E");
  background-size: 1.25rem; /* Custom size for the background */

  background-repeat: no-repeat;
  background-position: left 1rem center;
}
</style>
