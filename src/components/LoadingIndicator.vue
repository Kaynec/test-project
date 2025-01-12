<template>
  <div>
    <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
      <div class="flex justify-center">
        <div class="flex flex-col items-center gap-4">
          <div
            class="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <span> {{ text ?? "درحال بارگذاری لطفا صبر کنید " }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string;
}>();
</script>
