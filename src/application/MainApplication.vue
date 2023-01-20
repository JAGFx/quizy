<template>
  <component :is="currentPageComponent.component" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CategoryList from '@/application/components/category/CategoryList.vue';
import QuizForm from '@/application/components/quiz/QuizForm.vue';
import ResultView from '@/application/components/result/ResultView.vue';
import { Page } from '@/application/shared/pages.type';
import type { PageComponent } from '@/application/shared/pages.type';
import { useQuizy } from '@/application/shared/useQuizy';

/**
 * List of pages
 */
const pageComponents: PageComponent[] = [
  {
    name: Page.CategoryList,
    component: CategoryList
  },
  {
    name: Page.Quiz,
    component: QuizForm
  },
  {
    name: Page.Result,
    component: ResultView
  }
];

const { currentPage } = useQuizy();

/**
 * Return the current active page
 */
const currentPageComponent = computed<PageComponent>(
  () =>
    pageComponents
      .filter((pageComponent) => pageComponent.name === currentPage.value)
      .pop() as PageComponent
);
</script>

<style lang="scss">
@import 'style/application';
</style>
