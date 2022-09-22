<script setup>
import { computed, onMounted, ref } from 'vue';
import { isEmpty } from 'lodash';
import store from '@/store';

const props = defineProps({
  status: 0,
});
const emits = defineEmits(['update:modelValue']);

const statusList = ref([
  { label: 'BLOCKED', value: 0 },
  { label: 'ACTIVE', value: 1 },
  { label: 'PENDING', value: 2 },
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
    <!-- <option :value="3" disabled>Select status</option> -->
    <option
      v-for="(item, index) in statusList"
      :key="index"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </TomSelect>
</template>
