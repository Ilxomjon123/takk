<script setup>
import { useRoute } from 'vue-router';
import TopBar from '@/components/admin-top-bar/Main.vue';
import MobileMenu from '@/components/mobile-menu/Main.vue';
import GlobalLoader from '@/components/GlobalLoader.vue';
import SuccessNotification from '@/components/notifications/SuccessNotification.vue';
import ErrorNotification from '@/components/notifications/ErrorNotification.vue';
import CompanySelectModal from '@/components/modals/CompanySelectModal.vue';
import Sidebar from './blocks/sidebar/index.vue';

const route = useRoute();
</script>

<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <MobileMenu />
    <div class="flex">
      <!-- BEGIN: Side Menu -->
      <Sidebar />
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <div class="relative">
          <GlobalLoader />
        </div>
        <TopBar />
        <div class="container">
          <RouterView v-slot="{ Component }">
            <template v-if="Component">
              <Transition name="fade-fast" mode="out-in">
                <!-- <KeepAlive> -->
                <Suspense>
                  <!-- main content -->
                  <component :is="Component" :key="route.fullPath" />

                  <!-- loading state -->
                  <template #fallback>
                    Loading...
                  </template>
                </Suspense>
                <!-- </KeepAlive> -->
              </Transition>
            </template>
          </RouterView>
        </div>
        <SuccessNotification />
        <ErrorNotification />
      </div>
      <!-- END: Content -->
    </div>

    <CompanySelectModal />
  </div>
</template>

<style lang="scss">
.main {
  background-repeat: no-repeat;
  background-attachment: fixed;
  @apply py-5;
}
</style>
