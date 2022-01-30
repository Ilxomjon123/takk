<template>
  <div class="input-form mt-3">
    <label class="form-label w-full flex flex-col">
      {{ title }}
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="form-control"
        :class="{ 'border-theme-6': errors.length > 0 }"
        :placeholder="'Type ' + title"
      />
    </label>
    <template v-if="errors.length > 0">
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="text-theme-6 mt-2"
      >{{ error.$message }}</div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    modelValue: String,
    errors: Array,
  },
  emits: ['update:modelValue']
});
</script>
