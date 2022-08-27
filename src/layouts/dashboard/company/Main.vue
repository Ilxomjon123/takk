<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import CompanyCard from '@/components/cards/CompanyCard.vue';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchCompany');
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 lg:pt-5">
    <CompanyCard />
    <RouterView />
  </div>
</template>
