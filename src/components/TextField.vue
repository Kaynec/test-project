<template>
  <div class="relative">
    <label class="">
      {{ placeholder }}
    </label>
    <div class="relative">
      <div @click="" class="absolute top-1/2 -translate-y-1/2 left-0 pl-2">
        <slot name="append"> </slot>
      </div>
      <div @click="" class="absolute top-1/2 -translate-y-1/2 right-0 pr-2">
        <slot name="prepend"> </slot>
      </div>
      <input
        type="text"
        class="block p-4 px-8 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
        v-model="text"
        v-bind="$attrs"
        @input="error = ''"
      />
    </div>
    <p v-if="error" class="py-2 text-xs font-bold text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const text = defineModel({ required: true });
const error = defineModel("error", { required: true });
defineProps<{
  placeholder?: string;
}>();
</script>
