<template>
  <h1 class="quiz-category">
    <div class="text-center w-100">
      {{ quiz?.category.name }}
    </div>
    <div class="w-auto">
      <div class="timer d-flex-center-center">{{ timer }} s</div>
    </div>
  </h1>
  <section class="quiz">
    <div class="head d-flex-center-center">
      <div>
        {{ quiz?.questions.indexOfValue(currentQuestion) + 1 }}/{{
          quiz?.questions.length
        }}
      </div>
      <h3>{{ currentQuestion?.text }}</h3>
    </div>
  </section>
  <QuizQuestionAnswerList />
  <div class="d-flex-center-center">
    <button @click="passToTheNextQuestion" v-if="!isTheLastQuestion">
      Next
    </button>
    <button @click="finishQuiz" v-else>Next</button>
  </div>
</template>

<script setup lang="ts">
import QuizQuestionAnswerList from "@/application/components/quiz/QuizQuestionAnswerList.vue";
import { useQuiz } from "@/application/components/quiz/useQuiz";
import { useQuizy } from "@/application/components/useQuizy";
import { Page } from "@/application/shared/pages.type";
import { useTimer } from "@/application/components/useTimer";

const {
  quiz,
  currentQuestion,
  isTheLastQuestion,
  passToTheNextQuestion,
  finish,
} = useQuiz();

const { switchToPage } = useQuizy();
const { timer } = useTimer();

const finishQuiz = () => {
  finish();
  switchToPage(Page.Result);
};
</script>
