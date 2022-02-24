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

<script>
import { defineComponent } from 'vue'
import MenuList from '../../../components/lists/MenuList.vue';
import ModifiersList from '../../../components/lists/ModifiersList.vue';

export default defineComponent({
  components: { MenuList, ModifiersList },

  methods: {
    fetchData(val) {
      this.$refs.modifiersList.search();
    }
  }
})
</script>
