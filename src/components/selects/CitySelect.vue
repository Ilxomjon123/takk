<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const {
  citiesList,
  setSelectedCity,
  getCities
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

watch(() => props.modelValue, async (newVal, oldVal) => {
  await setSelectedCity(newVal)
})

</script>

<template>
  <TomSelect v-model="selectedCity" :options="{
    placeholder: 'Search..'
  }" class="w-full">
    <option v-for="({ id, name }, index) in citiesList" :key="index" :value="id">{{ name }}</option>
  </TomSelect>
</template>

