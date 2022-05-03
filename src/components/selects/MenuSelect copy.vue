<script setup>
import { computed, onMounted } from 'vue';
import store from '../../store';

const emit = defineEmits(['update:modelValue']);

const menuList = computed(() => store.getters['getMenus'].results);
const selectedMenuItem = computed({
  get: () => { },
  set: (value) => {
    emit('update:modelValue', value);
  }
});

</script>

<template>
  <TomSelect v-model="selectedMenuItem" class="w-full">
    <option v-for="(item, index) in menuList" :key="'product_menu_' + index" :value="item.id">
      {{ item.name }}
    </option>
  </TomSelect>
</template>

