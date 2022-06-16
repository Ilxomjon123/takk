<script setup>
import { computed, onMounted } from 'vue';
import useCountries from '@/features/useCountries';
import states from '@/utils/states.json';

const props = defineProps({
  modelValue: String,
  country: String,
});

const emit = defineEmits(['update:modelValue']);

const {
  searchCities
} = useCountries();

const selectedState = computed({
  get: () => {
    return props.modelValue;
  },
  set: async (val) => {
    // setSelectedState(val);
    emit('update:modelValue', val);
    await searchCities(props.country, val)
  }
});

const isCountryUSA = computed(() => props.country === 'United States' || props.country === 'US')

</script>

<template>
  <TomSelect v-model="selectedState" :options="{
    placeholder: 'Select state'
  }" class="w-full">
    <option v-for="({ code, name }, index) in states" :key="index" :value="name">
      {{ name }}
    </option>
  </TomSelect>
</template>

<style lang="scss" scoped>
select:disabled {
  cursor: not-allowed;
}
</style>
