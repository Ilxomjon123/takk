<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-base mr-auto">
        Cafe weeek time
      </h2>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.monday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="monday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="monday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="monday_is_open"
          v-model="weekTime.monday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="monday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.monday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="monday_opening_time"
          v-model="weekTime.monday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_opening_time"
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
          v-model="weekTime.monday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.tuesday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="tuesday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="tuesday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="tuesday_is_open"
          v-model="weekTime.tuesday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="tuesday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.tuesday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="tuesday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="tuesday_opening_time"
          v-model="weekTime.tuesday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="tuesday_opening_time"
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
          v-model="weekTime.tuesday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="tuesday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.wednesday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="wednesday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="wednesday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="wednesday_is_open"
          v-model="weekTime.wednesday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label
          class="form-check-label whitespace-nowrap"
          for="wednesday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.wednesday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="wednesday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="wednesday_opening_time"
          v-model="weekTime.wednesday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="wednesday_opening_time"
          class="form-control timepicker"
        />
      </div>
      <div class="input-form lg:basis-1/2">
        <label
          for="wednesday_closing_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Closing time
        </label>
        <input
          id="wednesday_closing_time"
          v-model="weekTime.wednesday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="wednesday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.thursday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="monday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="monday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="monday_is_open"
          v-model="weekTime.thursday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="monday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.thursday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="monday_opening_time"
          v-model="weekTime.tuesday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_opening_time"
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
          v-model="weekTime.tuesday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.tuesday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="monday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="monday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="monday_is_open"
          v-model="weekTime.tuesday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="monday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.friday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="monday_opening_time"
          v-model="weekTime.tuesday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_opening_time"
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
          v-model="weekTime.tuesday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.tuesday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="monday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="monday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="monday_is_open"
          v-model="weekTime.tuesday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="monday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.saturday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="monday_opening_time"
          v-model="weekTime.tuesday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_opening_time"
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
          v-model="weekTime.tuesday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="input-form basis-1/2">
        <input
          v-model="weekTime.sunday.title"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="monday_title"
          class="form-control"
        />
      </div>
      <div class="form-check w-auto">
        <input
          id="monday_is_open"
          class="form-check-switch"
          type="checkbox"
          name="monday_is_open"
          v-model="weekTime.sunday.is_open"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label class="form-check-label whitespace-nowrap" for="monday_is_open"
          >Is open</label
        >
      </div>
    </div>
    <div class="flex gap-5 pt-3" v-if="weekTime.sunday.is_open">
      <div class="input-form lg:basis-1/2">
        <label
          for="monday_opening_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Opening time
        </label>
        <input
          id="monday_opening_time"
          v-model="weekTime.sunday.opening_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_opening_time"
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
          v-model="weekTime.sunday.closing_time"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          name="monday_closing_time"
          class="form-control timepicker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const weekTime = reactive({
  monday: {
    title: 'Monday',
    opening_time: null,
    closing_time: null,
    is_open: false
  },
  tuesday: {
    title: 'Tuesday',
    opening_time: null,
    closing_time: null,
    is_open: false
  },
  wednesday: {
    title: 'Wednesday',
    opening_time: null,
    closing_time: null,
    is_open: false
  },
  thursday: {
    title: 'Thursday',
    opening_time: null,
    closing_time: null,
    is_open: false
  },
  friday: {
    title: 'Friday',
    opening_time: null,
    closing_time: null,
    is_open: false
  },
  saturday: {
    title: 'Saturday',
    opening_time: null,
    closing_time: null,
    is_open: false
  },
  sunday: {
    title: 'Sunday',
    opening_time: null,
    closing_time: null,
    is_open: false
  }
});

// const rules = {
//   week_time: {
//     monday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     },
//     tuesday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     },
//     wednesday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     },
//     thursday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     },
//     friday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     },
//     saturday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     },
//     sunday: {
//       title: {},
//       opening_time: {},
//       closing_time: {},
//       is_open: {}
//     }
//   },
// };
</script>

<style></style>
