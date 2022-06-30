<template>
  <label v-if="label" :for="id">{{ label }}</label>
  <input
    class="form-control"
    v-bind="{
      ...$attrs,
      onInput: updateValue
    }"
    :id="id"
    :value="modelValue"
    :placeholder="label"
    :aria-describedby="error ? `${id}-error` : null"
    :aria-invalid="error ? true : false"
    :class="{ error }"
  />
  <BaseErrorMessage v-if="error" :id="`${id}-error`">{{ error }}</BaseErrorMessage>
</template>

<script>
import SetupFormComponent from '@/features/SetupFormComponent'
import BaseErrorMessage from './BaseErrorMessage.vue'

export default {
  components: { BaseErrorMessage },
  props: {
    label: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    id: {
      type: [String, Number],
      required: true,
    }
  },
  setup(props, context) {
    const { updateValue } = SetupFormComponent(props, context);
    return {
      updateValue,
    };
  }
}
</script>
