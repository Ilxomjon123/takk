<script setup>
import { computed } from 'vue';
import useCountries from '@/features/useCountries';
import store from '../../store';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);
const {
  citiesList,
  searchCities
} = useCountries();

const { country, state } = store.getters['getCompany'];
// searchCities(country, state)

const selectedCity = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit('update:modelValue', val);
  }
});

</script>

<template>
  <TomSelect v-model="selectedCity" :options="{
    placeholder: 'Search..'
  }" class="w-full">
    <option v-for="(item, index) in citiesList" :key="index" :value="item">{{ item }}</option>
  </TomSelect>
</template>

