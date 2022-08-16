<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps(['modelValue']);

const emit = defineEmits(['update:modelValue']);

const {
  countriesList,
  getCountries,
  getStates,
  setSelectedCountry
} = useCountries();

const selectedCountry = computed({
  get: () => {
    return props.modelValue || 236;
  },
  set: val => {
    emit('update:modelValue', val);
  }
});

await getCountries();

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    console.log('country new val: ', newVal);
    setSelectedCountry(newVal);
    await getStates();
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full">
    <option
      v-for="(country, index) in countriesList"
      :key="index"
      :value="country.id"
    >
      {{ country.name }}
    </option>
  </TomSelect>
</template>
