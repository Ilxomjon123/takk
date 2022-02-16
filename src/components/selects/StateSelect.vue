<template>
  <TomSelect
    v-model="selectedState"
    :options="{
      placeholder: 'Select state'
    }"
    class="w-full"
  >
    <option
      v-for="(item, index) in statesList"
      :key="index"
      :value="item.value"
    >{{ item.name }}</option>
  </TomSelect>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const statesList = computed(() => store.getters.getStatesList);
const selectedState = ref('');
</script>
