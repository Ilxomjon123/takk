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
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  cash('html').addClass('bg-theme-2')
})

onUnmounted(() => {
  cash('html').removeClass('bg-theme-2')
})

</script>

<style scoped>
</style>
