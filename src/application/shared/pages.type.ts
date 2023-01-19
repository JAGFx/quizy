import type { Component } from 'vue';

export const enum Page {
  CategoryList,
  Quiz,
  Result
}

export type PageComponent = {
  name: Page;
  component: Component;
};
