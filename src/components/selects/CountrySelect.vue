<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const {
  countriesList,
  setSelectedCountry,
  searchCountries
} = useCountries();

const selectedCountry = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    setSelectedCountry(val);
    emit('update:modelValue', val);
  }
});

onMounted(async () => {
  await searchCountries()
  await setSelectedCountry(props.modelValue);
});
</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full">
    <option v-for="(country, index) in countriesList" :key="index" :value="country.country_code">
      {{ country.country_name }}
    </option>
  </TomSelect>
</template>

