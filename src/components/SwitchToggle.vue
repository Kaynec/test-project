<template>
  <div
    class="text-primary-text flex items-center gap-2 p-2 rounded-xl border-2 border-gray-200 border-solid"
  >
    <div class="relative inline-block w-11 h-5">
      <input
        v-model="checked"
        id="switch-component"
        type="checkbox"
        class="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-accent cursor-pointer transition-colors duration-300"
      />
      <label
        for="switch-component"
        class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-accent cursor-pointer"
      >
      </label>
    </div>
    <span> پاسخ الزامی </span>
  </div>
</template>

<script setup lang="ts">
const checked = defineModel<boolean>({ required: true });
</script>

<style scoped></style>
