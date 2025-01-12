<template>
  <div class="mb-auto grid grid-cols-2 w-full md:grid-cols-3 gap-x-2 gap-y-6">
    <Card v-for="form in forms" :key="form.form_id" class="!w-full">
      <div
        class="grid place-content-center w-full min-h-48 !p-0 bg-gray-100 bg-opacity-70 border-2 border-gray-100 rounded-sm"
      >
        <span class="text-2xl">{{ form.form_title }}</span>
      </div>
      <span class="text-gray-400">
        {{
          new Date(form.created_at).toLocaleDateString("fa", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}
      </span>
      <RouterLink :to="`/form/?form_id=${form.form_id}`">
        <Button variant="transparent" class="w-full border-2 border-gray-200">
          <EyeIcon class="size-6" />
          <span> مشاهده فرم </span>
        </Button>
      </RouterLink>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import { DataEntity } from "@/types";
import { EyeIcon } from "@heroicons/vue/24/outline";

defineProps<{
  forms: DataEntity[];
}>();
</script>
