<template>
  <div>
    <!-- Menu List start -->
    <MenuList
      @update-id="fetchData($event)"
      sub-item-title="Categories"
      sub-item-value="product_category_count"
    />
    <!-- Menu List end -->

    <ModifiersList ref="modifiersList" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuList from '@/components/lists/MenuList.vue';
import ModifiersList from '@/components/lists/ModifiersList.vue';
const modifiersList = ref();

function fetchData() {
  modifiersList.value.search();
}
</script>
