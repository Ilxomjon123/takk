<script setup>
import AppTopBar from '@/components/global-blocks/app-top-bar/index.vue';
import AppFooter from '@/components/global-blocks/app-footer/index.vue';
import cash from 'cash-dom';
import EntryModal from '@/components/modals/EntryModal.vue';
import MobileOverlayMenu from '@/components/overlay-menus/mobile-menu/index.vue';
import { onMounted, onUnmounted } from 'vue';
import ContactUsModal from '@/components/modals/ContactUsModal.vue';

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
  <EntryModal />
  <MobileOverlayMenu />
  <ContactUsModal />
</template>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 0;
  padding: 0;
}
</style>
