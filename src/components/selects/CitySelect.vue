<template>
  <TomSelect
    v-model="city"
    :options="{
      placeholder: 'Select city'
    }"
    class="w-full"
  >
    <option
      v-for="(item, index) in getCities"
      :key="index"
      :value="item"
    >{{ item }}</option>
  </TomSelect>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getCities = computed(() => store.getters.getCities);
const city = computed({
  get: () => store.getters['getSelectedCity'],
  set: (value) => {
    store.commit('setSelectedCity', value);
  }
});
</script>
