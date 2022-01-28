<template>
  <div class="input-form mt-3">
    <label
      for="validation-form-1"
      class="form-label w-full flex flex-col sm:flex-row"
    >
      Cafe name
      <span
        class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
      >Required, at least 1 characters</span>
    </label>
    <input
      id="validation-form-1"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      type="text"
      name="name"
      class="form-control"
      :class="{ 'border-theme-6': errors.length > 0 }"
      placeholder="Type your cafe name"
    />
    <template v-if="errors.length > 0">
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="text-theme-6 mt-2"
      >{{ error.$message }}</div>
    </template>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
  title: String,
  errors: Array,
});

const emit = defineEmits(['update:title'])

// function handleInput(event) {
//   console.log('title: ', event.target.value);
//   emit('update:modelValue', event.target.value)
// }

</script>
