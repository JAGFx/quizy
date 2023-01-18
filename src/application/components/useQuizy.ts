import { fetchCategories } from "@/domain/trivia.api";
import type { Category } from "@/domain/category/category.type";
import { CategoryCollection } from "@/domain/category/category.type";
import { computed, reactive } from "vue";
import { Page } from "@/application/shared/pages.type";

type QuizyState = {
  categories: CategoryCollection;
  page: Page;
};

const state = reactive<QuizyState>({
  categories: new CategoryCollection(),
  page: Page.CategoryList,
});

const getters = {
  categories: computed<Category[]>(() => Array.from(state.categories.values())),
  currentPage: computed<Page>(() => state.page),
};

const actions = {
  updateCategoriesList() {
    fetchCategories().then(
      (categories: CategoryCollection) => (state.categories = categories)
    );
  },
  switchToPage(page: Page) {
    state.page = page;
  },
};

export const useQuizy = () => ({
  ...getters,
  ...actions,
});
