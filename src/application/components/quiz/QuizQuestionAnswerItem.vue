<template>
  <div
    class="answer d-flex-center-center"
    :class="{
      valid: answerSelected && currentQuestion?.isAValidAnswer(props.answer),
      invalid: answerSelected && !currentQuestion?.isAValidAnswer(props.answer),
    }"
    @click="() => setAnAnswer(props.answer)"
  >
    {{ props.answer }}
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from "@/application/components/quiz/useQuiz";

type QuizQuestionAnswerItemProps = {
  answer: string;
};

const props = defineProps<QuizQuestionAnswerItemProps>();

const { currentQuestion, answerSelected, setAnAnswer } = useQuiz();
</script>
