<script setup>
import { computed, onMounted, ref } from 'vue';
import moment from 'moment';

onMounted(() => {
  emit('submit', {
    start: moment(startDate.value).format('YYYY-MM-DD'),
    end: moment(endDate.value).format('YYYY-MM-DD'),
  });
});

const emit = defineEmits(['submit']);
const todayDate = moment().format('DD MMM YYYY');
const startDate = ref(moment().subtract(1, 'month').format('DD MMM YYYY'));
const endDate = ref(todayDate);

const dateRange = computed(() => `${startDate.value} - ${endDate.value}`);

const search = (rangeString) => {
  if (rangeString) {
    const dates = rangeString.split(' - ');
    startDate.value = dates[0];
    endDate.value = dates[1];
  }

  emit('submit', {
    start: moment(startDate.value).format('YYYY-MM-DD'),
    end: moment(endDate.value).format('YYYY-MM-DD'),
  });
};

const setRange = (val) => {
  if (val < 7) {
    startDate.value = moment().subtract(val, 'day').format('DD MMM YYYY');
    endDate.value = moment().subtract(val, 'day').format('DD MMM YYYY');
  } else {
    switch (val) {
      case 10:
        startDate.value = moment().startOf('month').format('DD MMM YYYY');
        endDate.value = todayDate;
        break;
      case 20:
        startDate.value = moment()
          .subtract(1, 'month')
          .startOf('month')
          .format('DD MMM YYYY');
        endDate.value = moment()
          .subtract(1, 'month')
          .endOf('month')
          .format('DD MMM YYYY');
        break;
      default:
        startDate.value = moment().subtract(val, 'days').format('DD MMM YYYY');
        endDate.value = todayDate;
    }
  }
  search();
};
</script>

<template>
  <div class="dropdown inline-block" data-placement="bottom">
    <a
      href="javascript:;"
      class="dropdown-toggle form-control cursor-pointer py-2.5"
      aria-expanded="false"
      >{{ dateRange }}
    </a>
    <div class="dropdown-menu w-60">
      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
        <button
          data-dismiss="dropdown"
          @click="setRange(0)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
        >
          Today
        </button>
        <button
          data-dismiss="dropdown"
          @click="setRange(1)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
        >
          Yesterday
        </button>
        <button
          data-dismiss="dropdown"
          @click="setRange(7)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
        >
          Last 7 days
        </button>
        <button
          data-dismiss="dropdown"
          @click="setRange(30)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
        >
          Last 30 days
        </button>
        <button
          data-dismiss="dropdown"
          @click="setRange(10)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
        >
          This Month
        </button>
        <button
          data-dismiss="dropdown"
          @click="setRange(20)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
        >
          Last Month
        </button>

        <div id="daterangepicker">
          <div>
            <Litepicker
              v-model="dateRange"
              @update:modelValue="search"
              :options="{
                format: 'DD MMM YYYY',
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: new Date().getFullYear(),
                  months: true,
                  years: true,
                },
              }"
              class="form-control block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
