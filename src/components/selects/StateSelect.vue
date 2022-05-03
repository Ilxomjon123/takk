<script setup>
import { computed, ref } from 'vue';
import store from '../../store';

const statesList = computed(() => store.getters.getStatesList);
const selectedState = ref('');
</script>

<template>
  <TomSelect v-model="selectedState" :options="{
    placeholder: 'Select state'
  }" class="w-full">
    <option v-for="(item, index) in statesList" :key="index" :value="item.value">
      {{ item.name }}
    </option>
  </TomSelect>
</template>

<style lang="scss" scoped>
select:disabled {
  cursor: not-allowed;
}
</style>
