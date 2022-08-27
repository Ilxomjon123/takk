<script setup>
import { computed, watchEffect } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps(['modelValue']);

const emit = defineEmits(['update:modelValue']);

const {
  getCities,
  selectedCountry,
  setSelectedState,
  statesList
} = useCountries();

const selectedState = computed({
  get: () => {
    return props.modelValue;
  },
  set: val => {
    emit('update:modelValue', val);
  }
});

watchEffect(async () => {
  if (props.modelValue) {
    setSelectedState(props.modelValue);

    if (selectedCountry.value) {
      await getCities();
    }
  }
});
</script>

<template>
  <TomSelect v-model="selectedState" class="w-full">
    <option>Select state</option>
    <option
      v-for="{ id, name, state_code } in statesList"
      :key="state_code"
      :value="id"
    >
      {{ name }}
    </option>
  </TomSelect>
</template>

<style lang="scss" scoped>
select:disabled {
  cursor: not-allowed;
}
</style>
