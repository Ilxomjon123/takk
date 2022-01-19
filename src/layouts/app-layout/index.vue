<template>
  <div class>
    <AppTopBar />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>

  <!-- Modal -->
  <EntryModal />
</template>

<script setup>
import AppTopBar from '@/components/global-blocks/app-top-bar/index.vue';
import AppFooter from '@/components/global-blocks/app-footer/index.vue';
import cash from 'cash-dom';
import EntryModal from '../../components/modals/EntryModal.vue';

cash('body').removeClass('dark')
const body = document.querySelector('body')
body.style.background = '#fff'
</script>

<style scoped>
</style>
