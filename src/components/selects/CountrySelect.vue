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
    return Number(props.modelValue) || 236;
  },
  set: async val => {
    if (!isNaN(Number(val))) emit('update:modelValue', Number(val));
  }
});

await getCountries();

watch(
  () => selectedCountry.value,
  async (newVal, oldVal) => {
    if (!isNaN(Number(newVal))) {
      await setSelectedCountry(Number(newVal));
      emit('update:modelValue', Number(newVal));
    }
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
