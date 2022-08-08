<script setup>
import { ref } from 'vue';
import MenuList from '@/components/lists/MenuList.vue';
import CategoryList from '@/components/lists/CategoryList.vue';
</script>

<template>
  <div>
    <!-- Menu List start -->
    <MenuList
      sub-item-title="Categories"
      sub-item-value="product_category_count"
    />
    <!-- Menu List end -->

    <CategoryList />
  </div>
</template>
