<template>
  <TomSelect
    :id="idField"
    v-model="cafeStatus"
    :class="{ 'border-theme-6': errors.length > 0 }"
  >
    <option
      v-for="(item, index) in statusOptions"
      :key="item.label + index"
      :value="item.value"
    >{{ item.label }}</option>
  </TomSelect>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    'idField': String,
    'statusOptions': Array,
    errors: Array,
  },
});
</script>
