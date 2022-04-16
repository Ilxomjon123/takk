<script setup>
import { ref } from 'vue'
import MenuList from '@/components/lists/MenuList.vue'
import CategoryList from '@/components/lists/CategoryList.vue'

const categoryList = ref(null);

function fetchData(val) {
  categoryList.value.search();
}
</script>

<template>
  <div>
    <!-- Menu List start -->
    <MenuList @update-id="fetchData($event)" sub-item-title="Categories" sub-item-value="product_category_count" />
    <!-- Menu List end -->

    <CategoryList ref="categoryList" />
  </div>
</template>
