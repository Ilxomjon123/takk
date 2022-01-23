<template>
  <div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="tuesday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="tuesday_is_open"
          class="form-check-switch"
          type="checkbox"
          v-model="tuesday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="tuesday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="tuesday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="tuesday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="tuesday_opening_time"
          v-model="tuesday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          class="form-control timepicker"
        />
      </div>
      <div class="input-form lg:basis-1/2">
        <label
          for="tuesday_closing_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Closing time
        </label>
        <input
          id="tuesday_closing_time"
          v-model="tuesday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          class="form-control timepicker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const tuesday = reactive({
  title: 'Tuesday',
  opening_time: null,
  closing_time: null,
  is_open: false
});
</script>

<style></style>
