<script setup>
const props = defineProps({
  items: Array,
  modelValue: Number,
});

const emit = defineEmits(['update:modelValue']);

function handleChange(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <select
    required
    class="form-control"
    @change="handleChange"
    :value="modelValue"
  >
    <option value disabled>Select ...</option>
    <option v-for="item in items" :value="item.id">{{ item.name }}</option>
  </select>
</template>
