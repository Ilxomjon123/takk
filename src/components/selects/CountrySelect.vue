<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const {
  setSelectedCountry,
  countriesList
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
  if (!isEmpty(props.modelValue))
    await setSelectedCountry(props.modelValue)
});

</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full">
    <option v-for="({ name }, index) in countriesList" :key="index" :value="name">
      {{ name }}
    </option>
  </TomSelect>
</template>

