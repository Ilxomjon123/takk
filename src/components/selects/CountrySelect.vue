<template>
  <TomSelect
    v-model="selectedCountry"
    :options="{
      placeholder: 'Select country'
    }"
    class="w-full"
  >
    <option
      v-for="(item, index) in countriesList"
      :key="index"
      :value="item"
    >{{ item }}</option>
  </TomSelect>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(async () => {
  await store.dispatch('fetchCountries');
});

const countriesList = computed(() => store.getters.getCountries);
const selectedCountry = computed({
  get: () => store.getters.getSelectedCountry,
  set: (value) => {
    store.commit('setSelectedCountry', value);
    store.dispatch('fetchCities');
  }
});
</script>
