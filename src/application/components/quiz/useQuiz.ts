import { computed, reactive } from 'vue';

import type { Category } from '@/domain/category/category.type';
import type { Question } from '@/domain/quiz/question.type';
import {
  calculateScorePoint,
  createNewScore,
  getNextQuestion,
  isAValidAnswer,
  quizIsAtTheLastQuestion,
  startQuiz
} from '@/domain/quiz/quiz';
import type { Quiz, Score } from '@/domain/quiz/quiz.type';

import { useTimer } from '@/application/shared/useTimer';

type QuizState = {
  quiz: Quiz | null;
  currentQuestion: Question | null;
  answerSelected: boolean;
  score: Score;
};

const { timer, start, stop } = useTimer();

const state = reactive<QuizState>({
  quiz: null,
  currentQuestion: null,
  answerSelected: false,
  score: createNewScore()
});

const getters = {
  quiz: computed<Quiz | null>(() => state.quiz as Quiz),
  currentQuestion: computed<Question | null>(
    () => state.currentQuestion as Question
  ),
  isTheLastQuestion: computed<boolean>(() =>
    quizIsAtTheLastQuestion(state.quiz, state.currentQuestion as Question)
  ),
  answerSelected: computed<boolean>(() => state.answerSelected),
  scorePoint: computed<number>(() => calculateScorePoint(state.score)),
  score: computed<Score>(() => state.score)
};

const actions = {
  start(category: Category): Promise<void> {
    return startQuiz(category).then((quiz: Quiz) => {
      state.quiz = quiz;
      state.currentQuestion = getNextQuestion(
        state.quiz,
        state.currentQuestion as Question
      );

      start();

      state.score = createNewScore(state.quiz.questions.length);

      return;
    });
  },
  setAnAnswer(answer: string) {
    const validAnswer = isAValidAnswer(
      state.answerSelected,
      answer,
      state.currentQuestion as Question
    );

    if (validAnswer) {
      state.score.rightQuestion++;
    }

    state.answerSelected = true;
  },
  passToTheNextQuestion() {
    state.answerSelected = false;
    state.currentQuestion = getNextQuestion(
      state.quiz as Quiz,
      state.currentQuestion as Question
    );
  },
  finish() {
    stop();
    state.score.elapsedTime = timer.value;
  },
  reset() {
    state.quiz = null;
    state.currentQuestion = null;
    state.answerSelected = false;
    state.score = createNewScore();
  }
};

export const useQuiz = () => ({
  ...getters,
  ...actions
});
