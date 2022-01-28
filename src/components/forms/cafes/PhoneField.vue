<template>
  <div class="input-form mt-3">
    <label
      for="call_center"
      class="form-label w-full flex flex-col sm:flex-row"
    >Phone number</label>
    <input
      id="call_center"
      :value="call_center"
      @input="$emit('update:phone', $event.target.value)"
      type="text"
      class="form-control"
      :class="{ 'border-theme-6': errors.length > 0 }"
      placeholder="Phone number"
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
const props = defineProps({
  phone: String,
  errors: Array,
});

const emit = defineEmits(['update:phone']);
</script>
