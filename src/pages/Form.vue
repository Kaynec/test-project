<template>
  <main class="w-[90vw] max-w-[90rem] space-y-4">
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="grid place-content-center min-h-[90svh]">
      <LoadingIndicator />
    </div>

    <!-- Content Section -->
    <template v-else>
      <!-- Form Header -->
      <FormHeader
        @update="createOrUpdateForm"
        v-model="form"
        v-model:form-errors="formErrors"
        :isEditMode="isEditMode"
        @remove="remove"
      />
      <!-- Public Form Extra Layout -->
      <Card v-if="form.form_type == 'public'">
        <div class="grid grid-cols-2 gap-4">
          <TextField
            class="flex-1"
            error=""
            modelValue=""
            label="نام"
            disabled
            placeholder="نام را وارد کنید"
          >
          </TextField>
          <TextField
            class="flex-1"
            error=""
            modelValue=""
            disabled
            label="نام خانوادگی"
            placeholder="نام خانوادگی را وارد کنید"
          >
          </TextField>
          <TextField
            type="email"
            class="flex-1"
            error=""
            modelValue=""
            disabled
            label="ایمیل"
            placeholder="ایمیل را وارد کنید"
          >
          </TextField>
        </div>
      </Card>

      <!-- Section List -->
      <SectionList v-model="form" v-model:form-errors="formErrors" />

      <!-- Add New Question -->
      <Card class="h-24">
        <div class="items-center justify-center flex h-full">
          <Button variant="simple" @click="addNewSection">
            <PlusIcon class="size-6" />
            <span>پرسش جدید</span>
          </Button>
        </div>
      </Card>
    </template>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { myFetch } from "@/api";
import { notify } from "notiwind";
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import FormHeader from "@/components/Form/FormHeader.vue";
import SectionList from "@/components/Form/SectionList.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue"; // Import LoadingIndicator component
import { PlusIcon } from "@heroicons/vue/24/solid";
import { PATHS } from "@/constants";
import {
  FormApiResponse,
  FormError,
  FormModifyResponse,
  SectionError,
  SubmitFormRequestBody,
} from "@/types";
import TextField from "@/components/TextField.vue";

// Router hooks
const route = useRoute();
const router = useRouter();
const formId = route.query.form_id as string | undefined;

// Reactive state
const form = ref<SubmitFormRequestBody>({
  form_title: "",
  description: "",
  form_type: "choose",
  sections: [],
});
const formErrors = ref<FormError>({
  form_title: "",
  description: "",
  form_type: "",
  sections: [],
});
const isEditMode = Boolean(formId);
const isLoading = ref(false); // Track loading state

// Fetch existing form data (edit mode)
async function fetchFormData() {
  if (!isEditMode) return;
  isLoading.value = true; // Start loading
  try {
    const data = await myFetch<FormApiResponse>(
      `${PATHS.FORM}?form_id=${formId}`
    );
    form.value = {
      ...data.data,
      form_id: formId,
      sections: data.data.sections || [],
    };
    formErrors.value.sections =
      data.data.sections?.map(() => ({
        title: "",
        type: "",
        properties: [],
      })) ?? [];
  } catch (error) {
    notify({
      group: "all",
      variant: "failure",
      title: "بارگذاری فرم ناموفق بود",
      text: "خطا در بارگذاری اطلاعات فرم رخ داد.",
    });
  } finally {
    isLoading.value = false; // Stop loading
  }
}

// Add a new section
function addNewSection() {
  form.value.sections.push({
    title: "",
    required: true,
    properties: [],
    type: "choose",
  });
  formErrors.value.sections.push({
    title: "",
    type: "",
    properties: [],
  });
}

// Validate the form
function validateForm() {
  formErrors.value = {
    form_title: "",
    description: "",
    form_type: "",
    sections: form.value.sections.map(() => ({
      title: "",
      type: "",
      properties: [],
    })),
  };

  let isValid = true;

  // Validate form-level fields
  if (!form.value.form_title.trim()) {
    formErrors.value.form_title = "نام را وارد کنید";
    isValid = false;
  }
  if (!form.value.description.trim()) {
    formErrors.value.description = "توضیحات را وارد کنید";
    isValid = false;
  }
  if (form.value.form_type === "choose") {
    formErrors.value.form_type = "لطفا یک دسته‌بندی انتخاب کنید";
    isValid = false;
  }

  // Validate sections
  form.value.sections.forEach((section, index) => {
    const sectionError: SectionError = { title: "", type: "", properties: [] };

    if (!section) return;

    if (!section.title.trim()) {
      sectionError.title = `عنوان بخش ${index + 1} را وارد کنید`;
      isValid = false;
    }
    if (section.type === "choose") {
      sectionError.type = `نوع بخش ${index + 1} را وارد کنید`;
      isValid = false;
    }
    if (
      ["radio", "checkbox", "dropdown"].includes(section.type) &&
      (!section.properties || section.properties.length === 0)
    ) {
      sectionError.properties.push("حداقل یک گزینه مشخص کنید");
      isValid = false;
    }

    formErrors.value.sections[index] = sectionError;
  });

  return isValid;
}

// Handle form submission
async function createOrUpdateForm() {
  if (!validateForm()) return;

  isLoading.value = true; // Start loading
  try {
    await myFetch<FormModifyResponse>(
      `${PATHS.FORM}${isEditMode ? "?form_id=" + formId : ""}`,
      {
        method: isEditMode ? "PUT" : "POST",
        body: form.value,
      }
    );

    notify({
      group: "all",
      variant: "success",
      title: "عملیات موفق",
      text: `فرم با موفقیت ${isEditMode ? "ویرایش" : "ایجاد"} شد.`,
    });

    router.replace("/");
  } catch {
    notify({
      group: "all",
      variant: "failure",
      title: "عملیات ناموفق",
      text: "خطا در هنگام ذخیره فرم رخ داد.",
    });
  } finally {
    isLoading.value = false; // Stop loading
  }
}

// Fetch form data on mount
onMounted(fetchFormData);

async function remove() {
  if (!isEditMode) return;
  isLoading.value = true; // Start loading
  try {
    await myFetch<FormApiResponse>(`${PATHS.FORM}?form_id=${formId}`, {
      method: "DELETE",
    });
    notify({
      group: "all",
      variant: "success",
      title: "فرم با موفقیت حذف شد",
      text: "درحال هدایت به صفحه اصلی",
    });
    setTimeout(() => {
      router.replace("/");
    }, 2500);
  } catch (error) {
    notify({
      group: "all",
      variant: "failure",
      title: "خطایی در حذف فرم رخ داد",
    });
  } finally {
    isLoading.value = false; // Stop loading
  }
}
</script>
