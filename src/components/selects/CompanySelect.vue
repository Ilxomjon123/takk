<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get: () => {
    return props.modelValue;
  },
  set: async (val) => {
    emit('update:modelValue', val);
  }
});
const cafeList = computed(() => store.getters['getAdminCompanies']);
if(cafeList.value.length == 0) {
  store.dispatch('fetchAdminCompanies');
}

</script>

<template>
  <TomSelect v-model="selected" :options="{
    placeholder: 'Select Company',
  }">
  <option value="0">All Companies</option>
    <option v-for="(item, index) in cafeList" :key="index" :value="item.id">{{ item.name }}</option>
  </TomSelect>
</template>