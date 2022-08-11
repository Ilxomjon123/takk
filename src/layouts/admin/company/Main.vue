<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AdminCompanyCard from '@/components/cards/AdminCompanyCard.vue';

const store = useStore();

// onMounted(() => {
//   store.dispatch('fetchCompany');
// });
</script>

<template>
  <div class="grid grid-cols-12 gap-6 lg:pt-5">
    <AdminCompanyCard />
    <router-view />
  </div>
</template>
