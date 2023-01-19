import { slugify } from '@/domain/slugger';

export type Category = {
  name: string;
  slug: string;
};

export class CategoryCollection extends Map<string, Category> {
  /**
   * Method to be able to generate a Category array from Trivia API data
   * @param categoryNames
   * @return CategoryCollection
   */
  static fromArray(categoryNames: string[]): CategoryCollection {
    const collection = new this();

    categoryNames.map((categoryName: string) => {
      collection.set(categoryName, {
        name: categoryName,
        slug: slugify(categoryName)
      });
    });

    return collection;
  }
}
