import { computed, reactive } from 'vue';

import type { Category } from '@/domain/category/category.type';
import { CategoryCollection } from '@/domain/category/category.type';
import { fetchCategories } from '@/domain/trivia.api';

import { Page } from '@/application/shared/pages.type';

/**
 * This is a composable to manage the main application state
 * It's the main state.
 * It's allow you to change page and use the Trivia API
 */

type QuizyState = {
  categories: CategoryCollection;
  page: Page;
};

const state = reactive<QuizyState>({
  categories: new CategoryCollection(),
  page: Page.CategoryList
});

const getters = {
  /**
   * Array of category object.
   * @return Category[]
   */
  categories: computed<Category[]>(() => Array.from(state.categories.values())),

  /**
   * The actual active page
   * @return Page
   */
  currentPage: computed<Page>(() => state.page)
};

const actions = {
  /**
   * Fetch categories form the Trivia API and set the application state with the result
   *  @return void
   */
  updateCategoriesList() {
    fetchCategories().then(
      (categories: CategoryCollection) => (state.categories = categories)
    );
  },

  /**
   * Switch to the given page
   *
   * @return void
   * @param page
   */
  switchToPage(page: Page) {
    state.page = page;
  }
};

export const useQuizy = () => ({
  ...getters,
  ...actions
});
