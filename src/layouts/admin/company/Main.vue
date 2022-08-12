<script setup>
import AdminCompanyCard from '@/components/cards/AdminCompanyCard.vue';
</script>

<template>
  <div class="grid grid-cols-12 gap-6 lg:pt-5">
    <AdminCompanyCard />
    <router-view />
  </div>
</template>
