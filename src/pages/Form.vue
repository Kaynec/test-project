<template>
  <main class="w-[90vw] max-w-[90rem] space-y-4">
    <FormHeader
      @update="createOrUpdateForm"
      v-model="form"
      v-model:form-errors="formErrors"
    />
    <SectionList v-model="form" v-model:form-errors="formErrors" />
    <Card class="h-24">
      <div class="items-center justify-center flex h-full">
        <Button variant="simple" @click="addNewColumn">
          <PlusIcon class="size-6" />
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
import { ref } from "vue";
import { FormError, SectionError, SubmitFormRequestBody } from "@/types";

import { PlusIcon } from "@heroicons/vue/24/solid";
import FormHeader from "@/components/Form/FormHeader.vue";
import SectionList from "@/components/Form/SectionList.vue";
import { notify } from "notiwind";

const route = useRoute();

const formId = route.params.id;

// Form state
const form = ref<SubmitFormRequestBody>({
  form_title: "",
  description: "",
  form_type: "choose", // Default invalid value
  sections: [],
});

function addNewColumn() {
  form.value.sections.push({
    title: "",
    required: true,
    properties: [],
    type: "choose",
  });
  formErrors.value.sections.push({
    properties: [],
    title: "",
    type: "",
  });
}

// Form error state
const formErrors = ref<FormError>({
  form_title: "",
  description: "",
  form_type: "", // Default invalid value
  sections: [],
});

// Validate the form
const validateForm = () => {
  formErrors.value = {
    form_title: "",
    description: "",
    form_type: "",
    sections: formErrors.value.sections,
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
    let sectionError = { title: "", type: "" } as SectionError;
    let sectionValid = true;

    // Validate title for each section
    if (!section.title.trim()) {
      sectionError.title = `عنوان بخش ${index + 1} را وارد کنید`;
      sectionValid = false;
    }

    // Validate type for each section
    if (section.type == "choose") {
      sectionError.type = `نوع بخش ${index + 1} را وارد کنید`;
      sectionValid = false;
    }

    if (["radio", "checkbox", "dropdown"].includes(section.type)) {
      if (!section.properties || section.properties.length <= 0) {
        sectionError.properties.push(`حداقل یک گزینه مشخص کنید`);
        sectionValid = false;
      }
    }

    // If there are any errors, add them to formErrors
    if (!sectionValid) {
      formErrors.value.sections[index] = sectionError;
      isValid = false;
    }
  });
  console.log(formErrors);

  return isValid;
};

// Handle form submission
const createOrUpdateForm = async () => {
  // console.log(notify);
  // notify(
  //   {
  //     group: "foo",
  //     title: "Success",
  //     variant: "failure",
  //     text: "Your account was registered!",
  //   },
  //   4000
  // );
  // const isValid = validateForm();
  // if (!isValid) {
  //   return;
  // }
  // Proceed with form submission logic
};
</script>
