import { computed, ref } from 'vue';

const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 25;

const SECOND = 1000;

export const usePomodoro = () => {
  const title = ref('Timer');
  const reps = ref(0);
  const timer = ref(0);
  const timeoutRef = ref(0);

  const formatedTimer = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;

    let minutesText = minutes.toString();
    let secondsText = seconds.toString();
    if (minutes < 10) {
      minutesText = `0${minutesText}`;
    }
    if (seconds < 10) {
      secondsText = `0${secondsText}`;
    }
    return `${minutesText}:${secondsText}`;
  });

  const arrayChecks = computed(() => {
    return Array.from({ length: Math.floor(reps.value / 2) }).map((_, i) => i);
  });

  // TIMER MECHANISM
  function startTimer() {
    reps.value += 1;
    const workSec = WORK_MIN * 60;
    const shortBreakSec = SHORT_BREAK_MIN * 60;
    const longBreakSec = LONG_BREAK_MIN * 60;
    if ([1, 3, 5, 7].includes(reps.value)) {
      countDownRec(workSec);
      title.value = 'Work';
    } else if ([2, 4, 6].includes(reps.value)) {
      countDownRec(shortBreakSec);
      title.value = 'Short Break';
    } else if (reps.value == 8) {
      countDownRec(longBreakSec);
      title.value = 'Long Break';
    }
  }
  
  // COUNTDOWN MECHANISM
  function countDownRec(count: number) {
    timer.value = count;
    if (count > 0) {
      timeoutRef.value = setTimeout(() => {
        countDownRec(count - 1);
      }, SECOND);
    } else {
      startTimer();
    }
  }

  async function reset() {
    clearTimeout(timeoutRef.value);
    timer.value = 0;
    reps.value = 0;
  }

  return { title, startTimer, formatedTimer, reset, arrayChecks };
};
