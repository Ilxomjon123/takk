<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  status: 0,
});
const emits = defineEmits(['update:modelValue']);

const statusList = ref([
  { label: 'INACTIVE', value: 0 },
  { label: 'ACTIVE', value: 1 },
  // { label: 'PENDING', value: 2 },
]);

const selectedStatus = computed({
  get: () => props.status,
  set: (val) => {
    emits('update:modelValue', val);
  },
});
</script>

<template>
  <TomSelect v-model="selectedStatus">
    <option
      v-for="(item, index) in statusList"
      :key="index"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </TomSelect>
</template>
