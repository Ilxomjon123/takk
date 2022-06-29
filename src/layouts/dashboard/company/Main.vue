<script setup>
import CompanyCard from '../../../components/cards/CompanyCard.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
onMounted(()=>{
  store.dispatch('fetchCompany');
});
</script>
<template>
  <div class="grid grid-cols-12 gap-6 lg:pt-5">
    <CompanyCard />
    <router-view />
  </div>
</template>

