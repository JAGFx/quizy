import type { Category } from "@/domain/category/category.type";
import type { QuestionCollection } from "@/domain/quiz/question.type";

export type Quiz = {
  category: Category;
  questions: QuestionCollection;
};

export type Score = {
  totalQuestionCount: number;
  rightQuestion: number;
  elapsedTime: number;
};
