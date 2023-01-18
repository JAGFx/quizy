<template>
  <component :is="currentPageComponent.component" />
</template>

<script setup lang="ts">
import CategoryList from "@/application/components/category/CategoryList.vue";
import { Page } from "@/application/shared/pages.type";
import type { PageComponents } from "@/application/shared/pages.type";
import QuizForm from "@/application/components/quiz/QuizForm.vue";
import { useQuizy } from "@/application/components/useQuizy";
import { computed } from "vue";
import ResultView from "@/application/components/result/ResultView.vue";

const pageComponents: PageComponents[] = [
  {
    name: Page.CategoryList,
    component: CategoryList,
  },
  {
    name: Page.Quiz,
    component: QuizForm,
  },
  {
    name: Page.Result,
    component: ResultView,
  },
];

const { currentPage } = useQuizy();

const currentPageComponent = computed<PageComponents>(
  () =>
    pageComponents
      .filter((pageComponent) => pageComponent.name === currentPage.value)
      .pop() as PageComponents
);
</script>

<style lang="scss">
@import "style/application";
</style>
