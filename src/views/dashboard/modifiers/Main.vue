<template>
  <div>
    <!-- Menu List start -->
    <MenuList
      @update-id="fetchData($event)"
      sub-item-title="Categories"
      sub-item-value="product_category_count"
    />
    <!-- Menu List end -->

    <CategoryList ref="categoryList" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MenuList from '../../../components/lists/MenuList.vue'
import CategoryList from '../../../components/lists/CategoryList.vue'

export default defineComponent({
  components: { MenuList, CategoryList },

  methods: {
    fetchData(val) {
      this.$refs.categoryList.search();
    }
  }
})
</script>
