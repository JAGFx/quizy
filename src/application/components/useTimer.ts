import { ref } from "vue";

const timer = ref<number>(0);

let interval: number | undefined = undefined;

const actions = {
  start(step: number = 1000) {
    interval = setInterval(() => timer.value++, step);
  },
  stop() {
    clearInterval(interval);
    interval = undefined;
  },
};

export const useTimer = () => ({
  timer,
  ...actions,
});
