<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { isEmpty } from "lodash";

const store = useStore();

const selected = computed({
  get: () => {
    return store.getters.getAdminSelectedCompanyID;
  },
  set: async (val) => {
    store.commit('setSelectedCompanyID', val);
    location.reload();
  }
});

const cafeList = computed(() => store.getters['getAdminCompanies']);

onMounted(async () => {
  isEmpty(cafeList.value) && await store.dispatch('fetchAdminCompanies');
})
</script>

<template>
  <TomSelect class="w-44" v-model="selected" :options="{
    placeholder: 'Select Company',
  }">
    <option :value="0">All Companies</option>
    <option v-for="(item, index) in cafeList" :key="index" :value="item.id">{{ item.name }}</option>
  </TomSelect>
</template>
