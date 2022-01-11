<template>
  <div class>
    <AppTopBar />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppTopBar from '@/components/global-blocks/app-top-bar/index.vue';
import AppFooter from '@/components/global-blocks/app-footer/index.vue';
// import '@/assets/sass/_tailwind.scss';

</script>

<style>
html,
html body {
  padding: 0 !important;
  background: white !important;
  min-width: 100%;
}
</style>
