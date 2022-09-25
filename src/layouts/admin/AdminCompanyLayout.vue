<script setup>
import AdminCompanySidemenu from '@/components/cards/AdminCompanySidemenu.vue';
import { computed, reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCompanyById } from '@/api/admin';
import useCompany from '@/features/useCompany';

const route = useRoute();
const { setSelected } = useCompany();
const selectedCompanyID = computed(() => route.query?.id ?? null);

// store.dispatch('adminCompany/getCompany', selectedCompanyID)
watchEffect(async () => {
  if (selectedCompanyID.value) {
    const res = await fetchCompanyById(selectedCompanyID.value);
    setSelected(res);
  } else {
    setSelected({
      name: '',
      phone: '',
      email: '',
      website: '',
      country: 236,
      country_code: 'US',
      state: '',
      city: '',
      address: '',
      second_address: '',
      postal_code: '',
      cashback_percent: 10,
      pub_show_reviews: '',
      pub_show_like: '',
      about: '',
    });
  }
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 lg:pt-5">
    <AdminCompanySidemenu />
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition name="fade-fast" mode="out-in">
          <!-- <KeepAlive> -->
          <Suspense>
            <!-- main content -->
            <component :is="Component" :key="route" />

            <!-- loading state -->
            <template #fallback> Loading... </template>
          </Suspense>
          <!-- </KeepAlive> -->
        </Transition>
      </template>
    </RouterView>
  </div>
</template>
