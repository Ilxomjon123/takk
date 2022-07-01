<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  idValue: {
    type: String,
    default: ''
  },
  typeValue: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

const placeholder = computed(() => 'Input ' + props.title);

</script>

<template>
  <div>
    <label :for="idValue" class="form-label">
      {{ title }}
      <span v-if="isRequired" class="text-primary-3">*</span>
    </label>
    <input :id="idValue" :type="typeValue" class="form-control" :placeholder="placeholder" :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)" />
    <span class="text-theme-6 mt-2">{{ error }}</span>
  </div>
</template>
