<template>
  <div class="relative mt-2">
    <label :class="{ invisible: !label }" class="mt-4 h-12 w-24">
      {{ label }}
    </label>
    <div class="relative">
      <div @click="" class="absolute top-1/2 -translate-y-1/2 left-0 pl-2">
        <slot name="append"> </slot>
      </div>
      <div @click="" class="absolute top-1/2 -translate-y-1/2 right-0 pr-2">
        <slot name="prepend"> </slot>
      </div>
      <component
        :is="inputType === 'textarea' ? 'textarea' : 'input'"
        :class="inputClass"
        :value="text"
        @input="handleInput"
        v-bind="$attrs"
        class="disabled:bg-slate-200"
      ></component>
    </div>
    <p class="py-2 text-xs font-bold text-red-600">
      {{ error ? error : "" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

const text = defineModel({ required: true });
const error = defineModel("error", { required: true });

watch(text, () => {
  console.log("CHANGE ", text.value);
});

defineProps<{
  label?: string;
  inputType?: "input" | "textarea";
}>();

// Method to handle input event and update text
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  text.value = target.value;
  error.value = ""; // Clear error on input change
};

// Dynamically assign styles based on type
const inputClass =
  "block p-3 px-8 w-full border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 resize-none";
</script>
