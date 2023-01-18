import type { Component } from "vue";

export const enum Page {
  CategoryList,
  Quiz,
  Result,
}

export type PageComponents = {
  name: Page;
  component: Component;
};
