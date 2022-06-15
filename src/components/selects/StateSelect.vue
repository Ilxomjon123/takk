<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: String,
  country: String,
});

const emit = defineEmits(['update:modelValue']);

const {
  statesList,
  setSelectedState,
  searchCities
} = useCountries();

const selectedState = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    setSelectedState(val);
    searchCities(props.country, val)
    emit('update:modelValue', val);
  }
});

onMounted(() => {
  setSelectedState(props.modelValue);
});
</script>

<template>
  <TomSelect v-model="selectedState" :options="{
    placeholder: 'Select state'
  }" class="w-full">
    <option v-for="(item, index) in statesList" :key="index" :value="item">
      {{ item }}
    </option>
  </TomSelect>
</template>

<style lang="scss" scoped>
select:disabled {
  cursor: not-allowed;
}
</style>
