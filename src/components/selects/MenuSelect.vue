<script setup>
import { computed } from 'vue';
import VueSelect from "vue-select";
import { isNull } from 'lodash';
import store from '@/store';

import "vue-select/dist/vue-select.css";

const emit = defineEmits(['update:modelValue']);

const menuList = computed(() => store.getters['getMenus'].results);
const selectedMenuItem = computed({
  get: () => { },
  set: (value) => {
    console.log('value: ', value);
    if (!isNull(value))
      emit('update:modelValue', value.id);
    else
      emit('update:modelValue', null);
  }
});
</script>

<template>
  <VueSelect v-model="selectedMenuItem" class="w-full" :options="menuList" label="name" code="id"
    placeholder="Select menu.." />
</template>

<style scoped>
:deep() {
  --vs-controls-color: #eee;
  --vs-border-color: #eee;

  --vs-dropdown-bg: #282c34;

  --vs-selected-bg: gray;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: gray;
  --vs-dropdown-option--active-color: #eeeeee;
}
</style>
