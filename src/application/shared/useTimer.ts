import { ref } from 'vue';

/**
 * A composable to manager a timer
 */

const timer = ref<number>(0);

let interval: number | undefined = undefined;

const actions = {
  /**
   * Start the timer
   * @param step Number of tick in milliseconds. Default 1 second (1000 ms)
   * @return void
   */
  start(step = 1000) {
    interval = setInterval(() => timer.value++, step);
  },

  /**
   * Stop the timer
   * @return void
   */
  stop() {
    clearInterval(interval);
    interval = undefined;
  }
};

export const useTimer = () => ({
  timer,
  ...actions
});
