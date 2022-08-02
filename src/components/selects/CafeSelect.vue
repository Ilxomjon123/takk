<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selectedCafe = computed({
  get: () => {
    return props.modelValue;
  },
  set: async (val) => {
    emit('update:modelValue', val);
  }
});
const cafeList = computed(() => store.getters['cafes/getCafeList']);
if(cafeList.value.length == 0) {
  store.dispatch('cafes/fetchCafeList');
}

</script>

<template>
  <TomSelect v-model="selectedCafe" :options="{
    placeholder: 'Select Cafe',
  }">
  <option value="0">All Cafes</option>
    <option v-for="(item, index) in cafeList" :key="index" :value="item.id">{{ item.name }}</option>
  </TomSelect>
</template>