<template>
  <div>
    <div class="flex mt-3 gap-5">
      <div class="form-check w-auto">
        <input :id="day.day + '_is_open'" class="form-check-switch" type="checkbox" :value="day.day"
          :checked="day.is_open" @input="$emit('update:is_open', $event.target.checked)" />
        <label class="form-check-label whitespace-nowrap" :for="day.day + '_is_open'">Open</label>
      </div>
      <div class="input-form">
        <input :value="day.day" type="text" class="form-control" disabled />
      </div>
      <div class="flex gap-5" v-if="day.is_open">
        <div class="input-form">
          <input :id="day.day + '_opening_time'" :value="day.opening_time"
            @input="$emit('update:opening_time', $event.target.value)" type="time" class="form-control timepicker" />
        </div>
        <div class="input-form">
          <input :id="day.day + '_closing_time'" :value="day.closing_time"
            @input="$emit('update:closing_time', $event.target.value)" type="time" class="form-control timepicker" />
        </div>
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
