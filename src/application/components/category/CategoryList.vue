<template>
  <h1 class="text-center">Choose a category</h1>
  <section class="category-list d-flex-center-center">
    <CategoryListItem
      v-for="category in categories"
      :key="category.slug"
      :category="category"
    />
  </section>
</template>

<script setup lang="ts">
import CategoryListItem from "@/application/components/category/CategoryListItem.vue";
import { useQuizy } from "@/application/components/useQuizy";

const { categories, updateCategoriesList } = useQuizy();

updateCategoriesList();
</script>
