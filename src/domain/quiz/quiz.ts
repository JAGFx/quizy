import type { Quiz, Score } from "@/domain/quiz/quiz.type";
import type { Question } from "@/domain/quiz/question.type";
import { fetchQuestions } from "@/domain/trivia.api";
import type { QuestionCollection } from "@/domain/quiz/question.type";
import type { Category } from "@/domain/category/category.type";

export const POINT_FOR_RIGHT_ANSWER = 5;
export const QUESTION_BY_QUIZ = 20;

export const getNextQuestion = (
  quiz: Quiz,
  currentQuestion: Question | null
): Question | null => {
  const questions = Array.from(quiz.questions.values());

  let nextQuestion: Question;
  if (currentQuestion === null) {
    nextQuestion = questions.shift() as Question;
  } else {
    nextQuestion = questions
      .slice(Array.from(quiz.questions.keys()).indexOf(currentQuestion.id) + 1)
      .shift() as Question;
  }

  return nextQuestion;
};

export const startQuiz = (category: Category) => {
  return new Promise<Quiz>((resolve) => {
    fetchQuestions(category, QUESTION_BY_QUIZ).then(
      (questions: QuestionCollection) => {
        const quiz: Quiz = {
          category,
          questions,
        };

        resolve(quiz);
      }
    );
  });
};

export const quizIsTheLastQuestion = (
  quiz: Quiz | null,
  currentQuestion: Question | null
): boolean => {
  if (quiz === null || currentQuestion === null) {
    return true;
  }

  return (
    quiz.questions.length === quiz.questions.indexOfValue(currentQuestion) + 1
  );
};

export const isAValidAnswer = (
  answerSelected: boolean,
  answer: string,
  currentQuestion: Question
): boolean => !answerSelected && currentQuestion?.isAValidAnswer(answer);

export const calculateScorePoint = (score: Score): number => {
  return score.rightQuestion * POINT_FOR_RIGHT_ANSWER;
};

export const createNewScore = (totalQuestionCount: number = 0): Score => ({
  rightQuestion: 0,
  elapsedTime: 0,
  totalQuestionCount,
});
