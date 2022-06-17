<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const {
  citiesList,
  setSelectedCity,
  // selectedCountry,
  // selectedState,
} = useCountries();

const selectedCity = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit('update:modelValue', val);
    setSelectedCity(val);
  }
});

</script>

<template>
  <TomSelect v-model="selectedCity" :options="{
    placeholder: 'Search..'
  }" class="w-full">
    <option v-for="({ name }, index) in citiesList" :key="index" :value="name">{{ name }}</option>
  </TomSelect>
</template>

