<template>
  <TomSelect
    :id="idField"
    v-model="cafeStatus"
    @input="$emit('update:selectedStatus', $event.target.value)"
    :class="{ 'border-theme-6': errors.length > 0 }"
  >
    <option
      v-for="(item, index) in statusOptions"
      :key="item.label + index"
      :value="item.value"
      :selected="selectedStatus.value === item.value"
    >{{ item.label }}</option>
  </TomSelect>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    idField: String,
    statusOptions: Array,
    errors: Array,
    selectedStatus: Object
  },
  emits: ['update:selectedStatus'],
  data: () => ({
    cafeStatus: null
  }),
  mounted() {
    this.cafeStatus = { ...this.selectedStatus }
  }
});
</script>
