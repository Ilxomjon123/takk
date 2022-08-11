<script setup>
import { computed, onMounted } from 'vue';
import { isEmpty } from 'lodash';
import store from '@/store';

const selected = computed({
  get: () => {
    return store.getters['adminCompany/getAdminSelectedCompanyID'];
  },
  set: async val => {
    store.commit('adminCompany/setSelectedCompanyID', val);
    location.reload();
  }
});

const cafeList = computed(
  () => store.getters['adminCompany/getAdminCompanies']
);

onMounted(async () => {
  isEmpty(cafeList.value) &&
    (await store.dispatch('adminCompany/fetchAdminCompanies'));
});
</script>

<template>
  <TomSelect
    class="w-44"
    v-model="selected"
    :options="{
      placeholder: 'Select Company'
    }"
  >
    <option :value="0">All Companies</option>
    <option v-for="(item, index) in cafeList" :key="index" :value="item.id">{{
      item.name
    }}</option>
  </TomSelect>
</template>
