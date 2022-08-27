<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import cash from 'cash-dom';
import store from '@/store';
import TopBar from '@/components/top-bar/Main.vue';
import SidebarMenu from './blocks/SidebarMenu.vue';
import MobileMenu from '@/components/mobile-menu/Main.vue';

const router = useRouter();

onMounted(() => {
  if (store.getters['getStep'] != store.state.user.STEP_DASHBOARD)
    router.push('/entry');

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
  </div>
</template>

<style lang="scss">
.main {
  background-repeat: no-repeat;
  background-attachment: fixed;
  @apply py-5;
}
</style>
