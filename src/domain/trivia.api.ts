import { CategoryCollection } from "@/domain/category/category.type";
import type { Category } from "@/domain/category/category.type";
import { QuestionCollection } from "@/domain/quiz/question.type";

export const fetchCategories = (): Promise<CategoryCollection> => {
  return fetch("https://the-trivia-api.com/api/categories")
    .then((response) => response.json())
    .then((response) => CategoryCollection.fromArray(Object.keys(response)));
};

export const fetchQuestions = (
  category: Category,
  limit: number
): Promise<QuestionCollection> => {
  return fetch(
    `https://the-trivia-api.com/api/questions?categories=${category.slug}&limit=${limit}&region=FR`
  )
    .then((response) => response.json())
    .then((response) => QuestionCollection.fromArray(response));
};
