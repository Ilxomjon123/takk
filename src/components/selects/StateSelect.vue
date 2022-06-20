<script setup>
import { computed, onMounted, watch } from 'vue';
import useCountries from '@/features/useCountries';
import { isEmpty } from 'lodash';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const {
  setSelectedState,
  statesList
} = useCountries();

const selectedState = computed({
  get: () => {
    return props.modelValue;
  },
  set: async (val) => {
    emit('update:modelValue', val);
    await setSelectedState(val);
  }
});

watch(() => props.modelValue, async (newVal, oldVal) => {
  console.log({ newVal, oldVal });
  await setSelectedState(newVal)
})

onMounted(async () => {
  console.log('props.modelValue: ', props.modelValue);
  if (!isEmpty(props.modelValue))
    await setSelectedState(props.modelValue)
})
</script>

<template>
  <TomSelect v-model="selectedState" :options="{
    placeholder: 'Select state'
  }" class="w-full">
    <option v-for="({ state_code, name }) in statesList" :key="state_code" :value="name">
      {{ name }}
    </option>
  </TomSelect>
</template>

<style lang="scss" scoped>
select:disabled {
  cursor: not-allowed;
}
</style>
