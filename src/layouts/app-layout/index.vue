<script setup>
import { onMounted, onUnmounted } from 'vue';
import cash from 'cash-dom';

import AppTopBar from '@/components/global-blocks/app-top-bar/index.vue';
import AppFooter from '@/components/global-blocks/app-footer/index.vue';
import MobileOverlayMenu from '@/components/overlay-menus/mobile-menu/index.vue';

onMounted(() => {
  cash('html').addClass('bg-theme-2');
  cash('html body').css('padding', 0);
});

onUnmounted(() => {
  cash('html').removeClass('bg-theme-2');
});
</script>

<template>
  <div class="content">
    <AppTopBar />
    <main>
      <RouterView v-slot="{ Component, route }">
        <template v-if="Component">
          <Transition name="fade-fast" mode="out-in">
            <!-- <KeepAlive> -->
            <Suspense>
              <!-- main content -->
              <component :is="Component" :key="route" />

              <!-- loading state -->
              <template #fallback>
                Loading...
              </template>
            </Suspense>
            <!-- </KeepAlive> -->
          </Transition>
        </template>
      </RouterView>
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
