import type { Category } from '@/domain/category/category.type';
import type { Question } from '@/domain/quiz/question.type';
import type { QuestionCollection } from '@/domain/quiz/question.type';
import type { Quiz, Score } from '@/domain/quiz/quiz.type';
import { fetchQuestions } from '@/domain/trivia.api';

export const POINT_FOR_RIGHT_ANSWER = 5;
export const QUESTION_BY_QUIZ = 20;

/**
 * Return the next question.
 * If the quiz do not contain questions, there are no more question
 * If the current question is already the latest questions, there are no more question too
 * Else return the question after the current question
 *
 * @param quiz The quiz
 * @param currentQuestion The current question used
 * @return Question|null
 */
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

/**
 * Start a quiz
 * Fetch all questions from Trivia API with the given category and then create a quiz with it
 * @param category
 * @return Quiz
 */
export const startQuiz = (category: Category) => {
  return new Promise<Quiz>((resolve) => {
    fetchQuestions(category, QUESTION_BY_QUIZ).then(
      (questions: QuestionCollection) => {
        const quiz: Quiz = {
          category,
          questions
        };

        resolve(quiz);
      }
    );
  });
};

/**
 * Identify if it's a the latest question
 * If there are no active quiz or no active question, it's not at the latest question
 * If the active question it the last of the quiz list, it's the latest question
 *
 * @param quiz
 * @param currentQuestion
 */
export const quizIsAtTheLastQuestion = (
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

/**
 * Verify if the given answer is the right answer
 * @param answerSelected
 * @param answer
 * @param currentQuestion
 */
export const isAValidAnswer = (
  answerSelected: boolean,
  answer: string,
  currentQuestion: Question
): boolean => !answerSelected && currentQuestion?.isAValidAnswer(answer);

/**
 * Calculate the score point
 * @param score
 */
export const calculateScorePoint = (score: Score): number => {
  return score.rightQuestion * POINT_FOR_RIGHT_ANSWER;
};

/**
 * Create an instance of Score. It's store every information about it
 * @param totalQuestionCount
 */
export const createNewScore = (totalQuestionCount = 0): Score => ({
  rightQuestion: 0,
  elapsedTime: 0,
  totalQuestionCount
});
