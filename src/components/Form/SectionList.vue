<template>
  <div class="space-y-4">
    <Card :key="idx" v-for="(column, idx) in form.sections">
      <div class="flex gap-4 items-center justify-between">
        <div class="flex flex-col lg:flex-row justify-start gap-4 flex-1">
          <div class="flex gap-4 flex-1">
            <TextField
              class="flex-1"
              :error="formErrors.sections[idx].title"
              v-model="column.title"
              placeholder="عنوان پرسش"
            >
            </TextField>
            <SelectField
              class="flex-1"
              :error="formErrors.sections[idx].type"
              v-model="column.type"
              :options="questionTypeOptions"
              placeholder="انتخاب کنید"
            >
            </SelectField>
          </div>
          <div
            class="flex flex-1 w-full lg:w-auto gap-2 lg:justify-end self-center"
          >
            <Button variant="transparent" @click="removeSection(idx)">
              <TrashIcon class="size-6" />
            </Button>
            <Button variant="transparent" @click="copySection(idx)">
              <ClipboardIcon class="size-6" />
            </Button>
            <SwitchToggle v-model="form.sections[idx].required" />
            <Button
              variant="transparent"
              :class="{ 'bg-gray-100 rounded-lg': idx == 0 }"
              :disabled="idx == 0"
              @click="moveUp(idx)"
            >
              <ArrowUpIcon class="size-6" />
            </Button>
            <Button
              :class="{
                'bg-gray-100 rounded-lg': idx >= form.sections.length - 1,
              }"
              :disabled="idx >= form.sections.length - 1"
              variant="transparent"
              @click="moveDown(idx)"
            >
              <ArrowDownIcon class="size-6" />
            </Button>
          </div>
        </div>
      </div>
      <div class="flex flex-1 gap-4">
        <div
          class="flex-1"
          v-if="column.type === 'text' || column.type === 'textarea'"
        >
          <TextField
            class="flex-1"
            :error="''"
            :modelValue="''"
            disabled
            :inputType="column.type == 'text' ? 'input' : 'textarea'"
            rows="7"
            label="توضیحات فرم"
            placeholder="توضیحات فرم را وارد کنید"
          >
          </TextField>
        </div>
        <div class="flex-1 bg-red-200" v-else-if="column.type === 'file'">
          <label
            for="uploadFile1"
            class="bg-white w-full flex-1 text-gray-500 font-semibold text-base rounded h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
          >
            <ArrowUpTrayIcon class="size-16" />
            بارگذاری
            <!-- <input type="file" id="uploadFile1" class="hidden" /> -->
            <p class="text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, فرمت های قابل قبول
            </p>
          </label>
        </div>
        <div
          v-else-if="
            column.type == 'radio' ||
            column.type == 'checkbox' ||
            column.type == 'dropdown'
          "
        >
          <div
            class="flex items-center gap-3 my-2"
            v-for="(_, index) in column.properties"
            :key="index"
          >
            <span
              class="w-4 mt-2 h-4 aspect-[1] border-2 border-solid border-gray-300 rounded-full"
              v-if="column.type == 'radio'"
            ></span>
            <span
              class="w-4 h-4 mt-2 aspect-[1] border-2 border-solid border-gray-300 rounded-md"
              v-if="column.type == 'checkbox'"
            ></span>
            <span class="mt-2" v-if="column.type == 'dropdown'">
              {{ index + 1 }}-
            </span>
            <input
              placeholder="وارد کردن اطلاعات"
              class="w-full bg-transparent border-b-2 border-gray-300 focus:border-accent focus:outline-none placeholder-gray-400"
              v-model="form.sections[idx].properties![index]"
            />

            <Button variant="simple" @click="removeProperty(idx, index)">
              <XMarkIcon class="size-6" />
            </Button>
          </div>
          <Button
            variant="simple"
            @click="form.sections[idx].properties?.push('')"
          >
            <span> افزودن گزینه جدید </span>
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { FormError, SubmitFormRequestBody } from "@/types";
import SelectField from "../SelectField.vue";
import TextField from "../TextField.vue";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import Card from "../Card.vue";
import Button from "../Button.vue";
import SwitchToggle from "../SwitchToggle.vue";
import { TrashIcon, ClipboardIcon } from "@heroicons/vue/24/outline";

const form = defineModel<SubmitFormRequestBody>({ required: true });

const formErrors = defineModel<FormError>("formErrors", { required: true });
const questionTypeOptions = [
  { label: "پاسخ کوتاه", value: "text" },
  { label: "پاسخ بلند", value: "textarea" },
  { label: "تک پاسخی", value: "radio" },
  { label: "چند پاسخی", value: "checkbox" },
  { label: "لیست انتخابی", value: "dropdown" },
  { label: "بارگذاری پیوست", value: "file" },
  { label: "انتخاب کنید", value: "choose", hidden: true },
];

function moveUp(index: number) {
  // Check if the index is valid for moving up
  if (index <= 0) {
    return; // Can't move up if it's the first section
  }

  // Get the current sections
  let sections = form.value.sections;

  // Swap the current section with the one above it
  [sections[index], sections[index - 1]] = [
    sections[index - 1],
    sections[index],
  ];

  // Update the sections in the reactive state (if using Vue)
  form.value.sections = [...sections];
}

function moveDown(index: number) {
  // Check if the index is valid for moving down
  if (index < 0 || index >= form.value.sections.length - 1) {
    return; // Can't move down if it's the last section
  }

  // Get the current sections
  let sections = form.value.sections;

  // Swap the current section with the one below it
  [sections[index], sections[index + 1]] = [
    sections[index + 1],
    sections[index],
  ];

  // Update the sections in the reactive state (if using Vue)
  form.value.sections = [...sections];
}

function removeProperty(sectionIndex: number, propertyIndex: number) {
  form.value.sections[sectionIndex].properties?.splice(propertyIndex, 1);
}

function removeSection(index: number) {
  form.value.sections.splice(index, 1);
  formErrors.value.sections.splice(index, 1);
}

function copySection(index: number) {
  form.value.sections.push(form.value.sections[index]);
  formErrors.value.sections.push(formErrors.value.sections[index]);
}
</script>
