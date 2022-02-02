<template>
  <div class="form-check w-auto">
    <input
      :id="name"
      :name="name"
      class="form-check-switch"
      type="checkbox"
      :checked="checked"
      @input="handleChange"
    />
    <label class="form-check-label" for="is_square_used">Is square used</label>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String
});

const { checked, handleChange } = useField(props.name, undefined, {
  // Will make the checkbox set its value to true/false if it was checked or not
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false,
});

</script>
