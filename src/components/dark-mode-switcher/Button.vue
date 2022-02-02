<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <a @click="switchMode">
    <SunIcon v-if="!darkMode" class="text-theme-12" />
    <MoonIcon v-else />
  </a>

  <!-- END: Dark Mode Switcher-->
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from '@/store'
import cash from 'cash-dom';

export default defineComponent({
  name: 'ThemeModeButton',
  setup() {
    const store = useStore()
    const darkMode = computed(() => store.state.main.darkMode)

    const setDarkModeClass = () => {
      darkMode.value
        ? cash('html').addClass('dark')
        : cash('html').removeClass('dark')
    }

    const switchMode = () => {
      store.dispatch('main/setDarkMode', !darkMode.value)
      setDarkModeClass()
    }

    onMounted(() => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        store.dispatch('main/setDarkMode', true)
      }
      setDarkModeClass()
    })
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      event.matches ? store.dispatch('main/setDarkMode', true) : store.dispatch('main/setDarkMode', false);
      setDarkModeClass()
    });

    return {
      switchMode,
      darkMode
    }
  }
});
</script>
