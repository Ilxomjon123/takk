<template>
  <div class="input-form mt-3">
    <label class="form-label w-full flex flex-col" :for="name">{{ label }}</label>
    <Field :id="name" :name="name" />
    <ErrorMessage :name="name" class="text-theme-6 mt-2" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Field, ErrorMessage } from 'vee-validate';

export default defineComponent({
  components: {
    Field,
    ErrorMessage
  },
  props: {
    name: String,
    label: Boolean
  }
});
</script>
