<template>
  <div class="answers">
    <QuizQuestionAnswerItem
      v-for="answer in currentQuestion?.answers"
      :key="answer"
      :answer="answer"
    />
  </div>
</template>

<script setup lang="ts">
import QuizQuestionAnswerItem from "@/application/components/quiz/QuizQuestionAnswerItem.vue";
import { useQuiz } from "@/application/components/quiz/useQuiz";

const { currentQuestion } = useQuiz();
</script>
