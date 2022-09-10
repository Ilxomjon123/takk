<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from '@/store';
import cash from 'cash-dom';

const store = useStore();
const darkMode = computed(() => store.getters['main/darkMode']);

const setDarkModeClass = () => {
  darkMode.value
    ? cash('html').addClass('dark')
    : cash('html').removeClass('dark');
};

const switchMode = () => {
  store.dispatch('main/setDarkMode', !darkMode.value);
  setDarkModeClass();
};

// onMounted(() => {
//   if (
//     window.matchMedia &&
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   ) {
//     store.dispatch('main/setDarkMode', true);
//   }
//   setDarkModeClass();
// });

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    event.matches
      ? store.dispatch('main/setDarkMode', true)
      : store.dispatch('main/setDarkMode', false);
    setDarkModeClass();
  });
</script>

<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <button @click="switchMode" class="intro-x cursor-pointer">
    <SunIcon v-if="!darkMode" class="text-theme-12 hover:text-theme-1" />
    <MoonIcon v-else class="hover:text-theme-1" />
  </button>

  <!-- END: Dark Mode Switcher-->
</template>
