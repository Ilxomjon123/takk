<template>
  <div>
    <WeekDayTimeForm
      v-for="day in week_time"
      :key="day"
      :day="day"
      :is_open="is_open"
      :opening_time="opening_time"
      :closing_time="closing_time"
    />
  </div>
</template>

<script setup>
import WeekDayTimeForm from './WeekDayTimeForm.vue';

defineProps({
  week_time: [
    {
      day: 'monday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'tuesday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'wednesday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'thursday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'friday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'saturday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'sunday',
      opening_time: null,
      closing_time: null,
      is_open: false
    }
  ]
});
</script>

<style></style>
