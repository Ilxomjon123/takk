<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps({
  modelValue: ''
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

onMounted(async () => {
  await getCountries()
  if (!isEmpty(props.modelValue)) {
    await setSelectedCountry(props.modelValue)
  }
});

</script>

<template>
  <TomSelect v-model="selectedCountry" class="w-full" v-if="countriesList.length > 0">
    <option v-for="(country, index) in countriesList" :key="index" :value="country">
      {{ country.name }}
    </option>
  </TomSelect>
</template>

