<template>
  <Card class="h-24">
    <form @submit.prevent="emit('update')" class="flex py-4 gap-4 justify-end">
      <Button
        @click="emit('remove')"
        class="bg-slate-100 rounded-lg"
        type="button"
        variant="transparent"
      >
        <TrashIcon class="size-6" />
      </Button>
      <Button class="whitespace-nowrap rounded-lg" type="submit">
        <CheckIcon />
        <span> ذخیره فرم </span>
      </Button>
    </form>
  </Card>
  <Card>
    <div class="flex lg:w-1/2 gap-4">
      <TextField
        class="flex-1"
        :error="formErrors.form_title"
        v-model="form.form_title"
        label="نام فرم"
        placeholder="نام فرم را وارد کنید"
      >
      </TextField>
      <SelectField
        class="flex-1"
        :error="formErrors.form_type"
        v-model="form.form_type"
        :options="selectFieldOptions"
        label="دسته بندی"
        placeholder="انتخاب کنید"
        :disabled="isEditMode"
        :class="'disabled:bg-slate-200'"
      >
      </SelectField>
    </div>
    <div class="flex md:w-1/2 gap-4">
      <TextField
        class="flex-1"
        :error="formErrors.description"
        v-model="form.description"
        inputType="textarea"
        rows="7"
        label="توضیحات فرم"
        placeholder="توضیحات فرم را وارد کنید"
      >
      </TextField>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { FormError, SubmitFormRequestBody } from "@/types";
import { CheckIcon, TrashIcon } from "@heroicons/vue/24/solid";
import Button from "../Button.vue";
import Card from "../Card.vue";
import TextField from "../TextField.vue";
import SelectField from "../SelectField.vue";

const form = defineModel<SubmitFormRequestBody>({ required: true });
const formErrors = defineModel<FormError>("formErrors", { required: true });

const emit = defineEmits(["update", "remove"]);

defineProps<{
  isEditMode: boolean;
}>();

const selectFieldOptions = [
  {
    label: "عمومی",
    value: "public",
  },
  {
    label: "خصوصی",
    value: "private",
  },
  {
    label: "انتخاب کنید",
    value: "choose",
    hidden: true,
  },
];
</script>
