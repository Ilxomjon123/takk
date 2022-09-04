<script setup>
import { ref } from 'vue';
import MenuList from '@/components/lists/MenuList.vue';
import ModifiersList from '@/components/lists/ModifiersList.vue';
import AdminMenuList from '../../../components/lists/AdminMenuList.vue';

const modifiersList = ref();

function fetchData() {
  modifiersList.value.search();
}
</script>

<template>
  <div>
    <!-- Menu List start -->
    <AdminMenuList
      @update-id="fetchData($event)"
      sub-item-title="Modifiers"
      sub-item-value="modifiers_count"
    />
    <!-- Menu List end -->

    <ModifiersList ref="modifiersList" />
  </div>
</template>
