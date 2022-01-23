<template>
  <div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="monday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="monday_is_open"
          class="form-check-switch"
          type="checkbox"
          v-model="monday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="monday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="monday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="monday_opening_time"
          v-model="monday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          class="form-control timepicker"
        />
      </div>
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_closing_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Closing time
        </label>
        <input
          id="monday_closing_time"
          v-model="monday.closing_time"
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

const monday = reactive({
  title: 'Monday',
  opening_time: null,
  closing_time: null,
  is_open: false
});
</script>

<style></style>
