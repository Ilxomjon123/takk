<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: Number
});

const emit = defineEmits(['update:modelValue']);

const { citiesList, setSelectedCity } = useCountries();

const selectedCity = computed({
  get: () => {
    return Number(props.modelValue);
  },
  set: val => {
    emit('update:modelValue', Number(val));
    setSelectedCity(Number(val));
  }
});
</script>

<template>
  <TomSelect v-model="selectedCity" class="w-full">
    <option>Select city</option>
    <option
      v-for="({ id, name }, index) in citiesList"
      :key="index"
      :value="id"
      >{{ name }}</option
    >
  </TomSelect>
</template>
