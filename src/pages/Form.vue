<template>
  <main class="w-[90vw] max-w-[90rem] space-y-4">
    <Card class="h-24">
      <form @submit.prevent="createOrUpdateForm" class="flex py-4 justify-end">
        <Button class="rounded-xl" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          <span> ذخیره فرم </span>
        </Button>
      </form>
    </Card>
    <Card>
      <div class="flex md:w-1/2 gap-4">
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
          :options="[
            {
              label: 'عمومی',
              value: 'public',
            },
            {
              label: 'خصوصی',
              value: 'private',
            },
            {
              label: 'انتخاب کنید',
              value: 'choose',
              hidden: true,
            },
          ]"
          label="دسته بندی"
          placeholder="انتخاب کنید"
        >
        </SelectField>
      </div>
      <div class="flex md:w-1/2 gap-4">
        <TextField
          class="flex-1"
          :error="formErrors.description"
          v-model="form.description"
          type="textarea"
          rows="7"
          label="توضیحات فرم"
          placeholder="توضیحات فرم را وارد کنید"
        >
        </TextField>
      </div>
    </Card>
    <Card class="h-24">
      <div class="items-center justify-center flex h-full">
        <Button variant="simple">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>پرسش جدید</span>
        </Button>
      </div>
    </Card>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import TextField from "@/components/TextField.vue";
import SelectField from "@/components/SelectField.vue";
import { ref } from "vue";
import { SubmitFormRequestBody } from "@/types";

type SectionError = {
  title: string;
  type: string;
  properties: string[];
};
const route = useRoute();

const formId = route.params.id;

// Form state
const form = ref<SubmitFormRequestBody>({
  form_title: "",
  description: "",
  form_type: "choose", // Default invalid value
  sections: [],
});

// Form error state
const formErrors = ref({
  form_title: "",
  description: "",
  form_type: "", // Default invalid value
  sections: [] as SectionError[],
});

// Validate the form
const validateForm = () => {
  formErrors.value = {
    form_title: "",
    description: "",
    form_type: "",
    sections: [],
  }; // Reset errors

  let isValid = true;

  // Validate form_title
  if (!form.value.form_title.trim()) {
    formErrors.value.form_title = "نام را وارد کنید";
    isValid = false;
  }

  // Validate description
  if (!form.value.description.trim()) {
    formErrors.value.description = "توضیحات را وارد کنید";
    isValid = false;
  }

  // Validate form_type
  if (form.value.form_type === "choose") {
    formErrors.value.form_type = "لطفا یک دسته‌بندی انتخاب کنید";
    isValid = false;
  }

  // Validate sections
  form.value.sections.forEach((section, index) => {
    let sectionError = { title: "", type: "", properties: [] } as SectionError;
    let sectionValid = true;

    // Validate title for each section
    if (!section.title.trim()) {
      sectionError.title = `عنوان بخش ${index + 1} را وارد کنید`;
      sectionValid = false;
    }

    // Validate type for each section
    if (!section.type.trim()) {
      sectionError.type = `نوع بخش ${index + 1} را وارد کنید`;
      sectionValid = false;
    }

    // Validate properties based on section type
    if (section.type === "short text" || section.type === "long text") {
      if (!section.properties.length || !section.properties?.[0].length) {
        sectionError.properties.push(
          `ویژگی‌های ورودی برای بخش ${index + 1} صحیح نیست`
        );
        sectionValid = false;
      }
    }

    if (section.type === "one answer") {
      if (!section.properties || section.properties.length === 0) {
        sectionError.properties.push(
          `گزینه‌ها برای بخش ${index + 1} وجود ندارد`
        );
        sectionValid = false;
      } else {
        const selectedOption = section.properties.find(
          (option) => option.selected
        ); // Assuming 'selected' attribute
        if (!selectedOption) {
          sectionError.properties.push(
            `لطفا یک گزینه را برای بخش ${index + 1} انتخاب کنید`
          );
          sectionValid = false;
        }
      }
    }

    if (section.type === "multiple answer") {
      if (!section.properties || section.properties.length === 0) {
        sectionError.properties.push(
          `گزینه‌ها برای بخش ${index + 1} وجود ندارد`
        );
        sectionValid = false;
      } else {
        const selectedOptions = section.properties.filter(
          (option) => option.selected
        ); // Assuming 'selected' attribute
        if (selectedOptions.length === 0) {
          sectionError.properties.push(
            `حداقل یک گزینه باید برای بخش ${index + 1} انتخاب شود`
          );
          sectionValid = false;
        }
      }
    }

    if (section.type === "file") {
      if (
        !section.properties ||
        section.properties.length !== 1 ||
        typeof section.properties[0] !== "object"
      ) {
        sectionError.properties.push(
          `ویژگی فایل برای بخش ${index + 1} صحیح نیست`
        );
        sectionValid = false;
      }
    }

    // If there are any errors, add them to formErrors
    if (!sectionValid) {
      formErrors.value.sections.push({ ...sectionError });
      isValid = false;
    }
  });

  return isValid;
};

// Handle form submission
const createOrUpdateForm = async () => {
  const isValid = validateForm();
  if (!isValid) {
    return;
  }

  // Proceed with form submission logic
};
</script>
