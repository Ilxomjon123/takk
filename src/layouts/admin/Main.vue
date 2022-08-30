<script setup>
import { onMounted } from 'vue';
import cash from 'cash-dom';
import TopBar from '@/components/admin-top-bar/Main.vue';
import MobileMenu from '@/components/mobile-menu/Main.vue';
import CompanySelectModal from '@/components/modals/CompanySelectModal.vue';
import SidebarMenu from './blocks/SidebarMenu.vue';

onMounted(() => {
  cash('body')
    .removeClass('error-page')
    .removeClass('login')
    .addClass('main');
});
</script>

<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <MobileMenu />
    <div class="flex">
      <!-- BEGIN: Side Menu -->
      <SidebarMenu />
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <TopBar />
        <div class="container">
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
        </div>
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
