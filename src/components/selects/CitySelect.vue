<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const {
  citiesList,
  setSelectedCity,
  searchCities,
  selectedCountry,
  selectedState,
} = useCountries();

const selectedCity = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    setSelectedCity(val);
    emit('update:modelValue', val);
  }
});

onMounted(async () => {
  await searchCities(selectedCountry.value.country_name, selectedState.value)
  await setSelectedCity(props.modelValue);
});
</script>

<template>
  <TomSelect v-model="selectedCity" :options="{
    placeholder: 'Search..'
  }" class="w-full">
    <option v-for="(item, index) in citiesList" :key="index" :value="item">{{ item }}</option>
  </TomSelect>
</template>

