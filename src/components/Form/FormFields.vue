<template>
  <Card>
    <div class="flex md:w-1/2 gap-4">
      <TextField
        class="flex-1"
        :error="formErrors.form_title"
        v-model="form.form_title"
        label="نام فرم"
        placeholder="نام فرم را وارد کنید"
      />
      <SelectField
        class="flex-1"
        :error="formErrors.form_type"
        v-model="form.form_type"
        :options="formTypeOptions"
        label="دسته بندی"
        placeholder="انتخاب کنید"
      />
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
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { FormError, SubmitFormRequestBody } from "@/types";
import TextField from "../TextField.vue";
import SelectField from "../SelectField.vue";

const form = defineModel<SubmitFormRequestBody>({ required: true });
const formErrors = defineModel<FormError>("formErrors", { required: true });

const formTypeOptions = [
  { label: "عمومی", value: "public" },
  { label: "خصوصی", value: "private" },
  { label: "انتخاب کنید", value: "choose", hidden: true },
];
</script>
