<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const { setSelectedCountry, countriesList, getCountries } = useCountries();

const selectedCountry = computed({
  get: () => {
    return props.modelValue || 236;
  },
  set: async val => {
    emit('update:modelValue', val);
    // await setSelectedCountry(val);
  }
});

getCountries();

watch(
  () => selectedCountry.value,
  async (newVal, oldVal) => {
    !isNaN(newVal) && (await setSelectedCountry(newVal));
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
