<template>
  <div>
    <!-- Menu List start -->
    <MenuList
      @update-id="fetchModifierTypes($event)"
      sub-item-title="Categories"
      sub-item-value="product_category_count"
    />
    <!-- Menu List end -->
    <!-- Menu List start -->
    <ModifierTypeList
      @update-modifier-type-id="fetchModifierItems($event)"
      ref="modifierTypeList"
    />
    <!-- Menu List end -->

    <ModifierList />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MenuList from '../../../components/lists/MenuList.vue'
import ModifierTypeList from '../../../components/lists/ModifierTypeList.vue';
import ModifierList from '../../../components/lists/ModifierList.vue';

export default defineComponent({
  components: { MenuList, ModifierTypeList, ModifierList },

  methods: {
    fetchModifierTypes(val) {
      this.$refs.modifierTypeList.search();
      this.$store.commit('setModifiers', []);
    },
    fetchModifierItems(val) {
      this.$store.commit('setModifiers', val.items);
    },
  }
})
</script>
