<script setup>
import AdminMenuList from '@/components/lists/AdminMenuList.vue';
import AdminCategoryList from './AdminCategoryList.vue';
</script>

<template>
  <div>
    <!-- Menu List start -->
    <AdminMenuList
      sub-item-title="Categories"
      sub-item-value="product_category_count"
    />
    <!-- Menu List end -->

    <AdminCategoryList />
  </div>
</template>
