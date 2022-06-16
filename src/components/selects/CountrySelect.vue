<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const {
  setSelectedCountry,
  countries
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

onMounted(async () => {
  await setSelectedCountry(props.modelValue)
});

</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full">
    <option v-for="({ code, name }, index) in countries" :key="index" :value="name">
      {{ name }}
    </option>
  </TomSelect>
</template>

