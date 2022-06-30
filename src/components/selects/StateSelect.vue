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
  await setSelectedState(newVal)
})

// onMounted(async () => {
//   if (!isEmpty(props.modelValue))
//     await setSelectedState(props.modelValue)
// })
</script>

<template>
  <TomSelect v-model="selectedState" :options="{
    placeholder: 'Select state'
  }" class="w-full">
    <option v-for="({ id, name, state_code }) in statesList" :key="state_code" :value="id">
      {{ name }}
    </option>
  </TomSelect>
</template>

<style lang="scss" scoped>
select:disabled {
  cursor: not-allowed;
}
</style>
