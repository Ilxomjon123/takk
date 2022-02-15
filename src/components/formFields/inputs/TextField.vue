<template>
  <div>
    <label>
      {{ labelText }}
      <input
        type="text"
        v-model="modelValue"
        :placeholder="labelText"
      />
    </label>
  </div>
</template>

<script setup>
import useInputValidator from "@/features/useInputValidator";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  labelText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const { input } = useInputValidator(
  props.modelValue,
  value => emit("update:modelValue", value)
);
</script>
