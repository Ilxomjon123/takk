<template>
  <div class="input-form" :class="{ 'border-theme-6': !!errorMessage }">
    <label class="form-label" :for="name">{{ label }}</label>
    <input
      class="form-control"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="text-theme-6 mt-2" v-show="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useField, ErrorMessage } from "vee-validate";

export default {
  components: {
    ErrorMessage
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String || Number,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>
