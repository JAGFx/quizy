<template>
  <h1 class="text-center">It's the end</h1>
  <p class="text-center">
    You answer {{ score.rightQuestion }} right of
    {{ score.totalQuestionCount }} questions
  </p>
  <p class="text-center">Elapsed time: {{ score.elapsedTime }} seconds</p>
  <h3 class="text-center">Total points: {{ scorePoint }}</h3>

  <div class="text-center">
    <button @click="goBackToCategoryList">Start a new quiz</button>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from '@/application/components/quiz/useQuiz';
import { Page } from '@/application/shared/pages.type';
import { useQuizy } from '@/application/shared/useQuizy';

const { scorePoint, score, reset } = useQuiz();
const { switchToPage } = useQuizy();

/**
 * Rest quiz to the initial state to be able to relaunch another quiz. Then move to the category list page
 */
const goBackToCategoryList = () => {
  reset();
  switchToPage(Page.CategoryList);
};
</script>
