<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';
import countries from '@/utils/countries.json';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const {
  searchCities
} = useCountries();

const selectedCountry = computed({
  get: () => {
    return props.modelValue;
  },
  set: async (val) => {
    emit('update:modelValue', val);
    await searchCities(val)
  }
});

</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full">
    <option v-for="({ code, name }, index) in countries" :key="index" :value="name">
      {{ name }}
    </option>
  </TomSelect>
</template>

