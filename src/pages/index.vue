<template>
  <main class="w-[90vw] max-w-[90rem] space-y-4">
    <div class="flex justify-between">
      <h1 class="font-bold text-xl">فرم ها</h1>
      <RouterLink to="/form">
        <Button class="rounded-xl">
          <PlusIcon class="size-4" />
          <span> ایجاد فرم </span>
        </Button>
      </RouterLink>
    </div>

    <Card class="w-full">
      <div
        class="min-h-[42rem] flex flex-col items-center justify-center gap-4"
      >
        <!-- Loading Indicator -->
        <LoadingIndicator v-if="isFetching" />

        <!-- Content Section -->
        <template v-else>
          <ErrorState v-if="error" />
          <EmptyState
            v-else-if="forms.length <= 0"
            message="تا به حال فرمی ساخته نشده است!"
            actionText="ایجاد فرم"
            actionLink="/form"
          />
          <FormsGrid v-else :forms="forms" />
        </template>
      </div>

      <!-- Pagination -->
      <PaginationControls
        v-if="totalPages"
        :current-page="currentPage"
        :total-pages="totalPages"
        @changePage="changePage"
      />
    </Card>
  </main>
</template>

<script setup lang="ts">
import { useFetch } from "@/api";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import PaginationControls from "@/components/FormList/PaginationControls.vue";
import ErrorState from "@/components/FormList/ErrorState.vue";
import EmptyState from "@/components/FormList/EmptyState.vue";
import FormsGrid from "@/components/FormList/FormsGrid.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { ref, computed } from "vue";
import { FormListApiResponse } from "@/types";
import { PATHS, PER_PAGE_PAGINATION_COUNT } from "@/constants";

// Reactive state
const currentPage = ref(1);
const url = ref(getPageUrl(currentPage.value));

// Fetch data
const { error, data, isFetching } = useFetch<FormListApiResponse>(url);

// Extract forms and total pages
const forms = computed(() => data.value?.data?.data ?? []);
const totalPages = computed(() => {
  const totalItems = data.value?.data?.totla_quantity ?? 0;
  return Math.ceil(totalItems / PER_PAGE_PAGINATION_COUNT);
});

function getPageUrl(page: number) {
  return `${PATHS.FORMLIST}?per_page=${PER_PAGE_PAGINATION_COUNT}&page=${page}`;
}

function changePage(page: number) {
  currentPage.value = page;
  url.value = getPageUrl(page);
}
</script>
