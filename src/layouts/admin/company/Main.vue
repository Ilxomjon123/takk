<script setup>
import AdminCompanyCard from '@/components/cards/AdminCompanyCard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="grid grid-cols-12 gap-6 lg:pt-5">
    <AdminCompanyCard />
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
</template>
