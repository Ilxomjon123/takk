<script setup>
import { ref } from 'vue';
import MenuList from '@/components/lists/MenuList.vue';
import ModifiersList from '@/components/lists/ModifiersList.vue';

const modifiersList = ref();

function fetchData() {
  modifiersList.value.search();
}
</script>

<template>
  <div>
    <!-- Menu List start -->
    <MenuList
      @update-id="fetchData($event)"
      sub-item-title="Modifiers"
      sub-item-value="modifiers_count"
    />
    <!-- Menu List end -->

    <ModifiersList ref="modifiersList" />
  </div>
</template>
