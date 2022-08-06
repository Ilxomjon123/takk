<script setup>
import { onMounted, onUnmounted } from 'vue';
import cash from 'cash-dom';

import AppTopBar from '@/components/global-blocks/app-top-bar/index.vue';
import AppFooter from '@/components/global-blocks/app-footer/index.vue';
import MobileOverlayMenu from '@/components/overlay-menus/mobile-menu/index.vue';

onMounted(() => {
  cash('html').addClass('bg-theme-2')
  cash('html body').css('padding', 0);
})

onUnmounted(() => {
  cash('html').removeClass('bg-theme-2')
})

</script>

<template>
  <div class="content">
    <AppTopBar />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
  <!-- Modals -->
  <MobileOverlayMenu />
</template>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 0;
  padding: 0;
}
</style>
