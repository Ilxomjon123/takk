<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const {
  setSelectedCountry,
  countriesList,
  getCountries
} = useCountries();

const selectedCountry = computed({
  get: () => {
    return props.modelValue;
  },
  set: async (val) => {
    emit('update:modelValue', val);
    await setSelectedCountry(val)
  }
});

getCountries()

watch(() => props.modelValue, async (newVal, oldVal) => {
  await setSelectedCountry(newVal)
})


</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full">
    <option v-for="(country, index) in countriesList" :key="index" :value="country.id">
      {{ country.name }}
    </option>
  </TomSelect>
</template>

