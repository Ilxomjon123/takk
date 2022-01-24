<template>
  <div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="day.day"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-check w-auto">
        <input
          :id="day.day + '_is_open'"
          class="form-check-switch"
          type="checkbox"
          v-model="day.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label
          class="form-check-label whitespace-nowrap"
          :for="day.day + '_is_open'"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="day.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          :for="day.day + '_opening_time'"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          :id="day.day + '_opening_time'"
          v-model="day.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          class="form-control timepicker"
        />
      </div>
      <div class="input-form lg:basis-1/2">
        <label
          :for="day.day + '_closing_time'"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Closing time
        </label>
        <input
          :id="day.day + '_closing_time'"
          v-model="day.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          class="form-control timepicker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  day: {
    day: '',
    opening_time: null,
    closing_time: null,
    is_open: false
  }
});
</script>
