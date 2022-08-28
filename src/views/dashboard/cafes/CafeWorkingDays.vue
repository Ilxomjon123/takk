<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import cash from 'cash-dom';
import Toastify from 'toastify-js';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import { fetchCafeWorkDays, updateCafeWorkDays } from '@/api';
import { useNotyf } from '@/composables/useNotyf';

const props = defineProps({
  formData: {
    type: Object,
    default: () => {}
  },
  externalErrors: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:formData']);
const route = useRoute();
const notyf = useNotyf();
const isLoading = ref(false);
const workingDayTimes = ref([
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
]);

onMounted(async () => {
  const res = await fetchCafeWorkDays(route.params.id);
  res.forEach((resItem, resItemIndex) => {
    workingDayTimes.value.forEach((weekDay, weekDayIndex) => {
      if (weekDay.day === resItem.day) {
        workingDayTimes.value[weekDayIndex] = resItem;
      }
    });
  });
});

async function submit() {
  try {
    isLoading.value = true;
    // emit('update:formData', props.formData);
    const res = await updateCafeWorkDays({
      data: { week_time: workingDayTimes.value },
      id: route.params.id
    });

    notyf.success();
  } catch (error) {
    if (error.response) {
      notyf.error();
      props.externalErrors.value = error.response.data;
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="intro-y box lg:mt-5">
    <div
      class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-base mr-auto">Cafe gallery</h2>
    </div>
    <div class="p-5">
      <div class="flex xl:flex-row flex-col">
        <div class="flex-1 mt-6 xl:mt-0">
          <div class="input-form">
            <div class="form-check w-auto">
              <input
                id="status"
                class="form-check-switch"
                type="checkbox"
                :checked="formData.status === 1 ? true : false"
                @change="
                  formData.status = $event.target.checked === true ? 1 : 0
                "
              />
              <label
                class="font-medium text-base ml-2 cursor-pointer"
                for="status"
                >Open/Closed</label
              >
            </div>
            <span class="text-theme-6 mt-2">{{
              externalErrors.status && externalErrors.status[0]
            }}</span>
          </div>
          <template v-if="formData.status === 1">
            <div
              class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
            >
              <h2 class="font-medium text-base mr-auto">Cafe hours</h2>
            </div>
            <WeekDayTimeForm
              v-for="(day, index) in workingDayTimes"
              :key="day.day"
              :day="day"
              @update:opening_time="day['opening_time'] = $event"
              @update:closing_time="day['closing_time'] = $event"
              @update:is_open="day['is_open'] = $event"
              class="mb-5 lg:mb-10"
            />
            <span class="text-theme-6 mt-2">{{
              externalErrors.week_time && externalErrors.week_time[0]
            }}</span>
          </template>
          <button
            type="button"
            class="btn btn-primary mt-5"
            @click="submit"
            :disabled="isLoading"
          >
            <!-- <LoadingIcon v-if="isLoading" icon="tail-spin" class="w-4 h-4 mr-3" color="#fff" /> -->
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
