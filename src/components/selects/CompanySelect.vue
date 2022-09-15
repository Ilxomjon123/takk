<script setup>
import { computed, onMounted } from 'vue';
import { isEmpty } from 'lodash';
import store from '@/store';

const selectedCompany = computed({
  get: () => {
    return store.getters['adminCompany/getAdminSelectedCompanyID'];
  },
  set: async (val) => {
    store.commit('adminCompany/setSelectedCompanyID', val);
    location.reload();
  },
});

const companyList = computed(
  () => store.getters['adminCompany/getAdminCompanies']
);

onMounted(async () => {
  isEmpty(companyList.value) &&
    (await store.dispatch('adminCompany/fetchAdminCompanies'));
});
</script>

<template>
  <TomSelect
    v-model="selectedCompany"
    :options="{
      placeholder: 'Select Company',
    }"
  >
    <option :value="0">All Companies</option>
    <option v-for="(item, index) in companyList" :key="index" :value="item.id">
      {{ item.name }}
    </option>
  </TomSelect>
</template>
