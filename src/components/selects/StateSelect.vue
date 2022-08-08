<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const { setSelectedState, statesList } = useCountries();

const selectedState = computed({
  get: () => {
    return Number(props.modelValue);
  },
  set: async val => {
    emit('update:modelValue', val);
    await setSelectedState(Number(val));
  }
});

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    if (Number(newVal)) await setSelectedState(Number(newVal));
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <TomSelect
    v-model="selectedState"
    :options="{
      placeholder: 'Select state'
    }"
    class="w-full"
  >
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
