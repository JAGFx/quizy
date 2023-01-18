<template>
  <article
    class="category d-flex-center-center"
    :style="{
      backgroundImage: getBackgroundImage(),
    }"
  >
    <h3 class="text-white">{{ props.category.name }}</h3>
    <button @click="startQuiz">Start</button>
  </article>
</template>

<script setup lang="ts">
import type { Category } from "@/domain/category/category.type";
import { useQuizy } from "@/application/components/useQuizy";
import { useQuiz } from "@/application/components/quiz/useQuiz";
import { Page } from "@/application/shared/pages.type";

const getBackgroundImage = (): string =>
  `linear-gradient(rgba(0,0,0,.5), transparent), url('https://picsum.photos/200?blur=8?random=${Math.random()}')`;

type categoryListItemProps = {
  category: Category;
};

const props = defineProps<categoryListItemProps>();
const { switchToPage } = useQuizy();
const { start } = useQuiz();

const startQuiz = () => {
  start(props.category).then(() => switchToPage(Page.Quiz));
};
</script>
