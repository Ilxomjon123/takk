<script setup>
import { onMounted, ref } from 'vue';
onMounted(() => {
  emit('submit', {start:getDate(30).split("-").reverse().join("-"), end:getDate().split("-").reverse().join("-")});
})
const emit = defineEmits(['submit'])
function getDate(val = 0, date = new Date()){
  // const date = new Date();
  date.setDate(date.getDate() - val);
  const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return day + '-'
    + month
    + '-' + date.getFullYear();
}
const dateRange = ref(getDate(30) + ' - ' + getDate());
const search = () => {
  const dates = dateRange.value.split(' - ');
  emit('submit', {start:dates[0].split("-").reverse().join("-"), end:dates[1].split("-").reverse().join("-")});
}
const setRange = (val) => {
  if(val < 7){
    dateRange.value = getDate(val) + ' - ' + getDate(val);
  } else {
    switch(val){
      case 10:
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        dateRange.value = getDate(0, firstDay) + ' - ' + getDate(0, lastDay); break;
      case 20:
        const date1 = new Date(), y1 = date1.getFullYear(), m1 = date1.getMonth() - 1;
        const firstDay1 = new Date(y1, m1, 1);
        const lastDay1 = new Date(y1, m1 + 1, 0);
        dateRange.value = getDate(0, firstDay1) + ' - ' + getDate(0, lastDay1); break;
      default: dateRange.value = getDate(val) + ' - ' + getDate(); break;
    }
  }
  search();
}
</script>

<template>
<form @submit.prevent="search">
  <div class="dropdown inline-block" data-placement="bottom">
    <a
      class="dropdown-toggle form-control cursor-pointer"
      aria-expanded="false"
    >{{ dateRange }}
    </a>
    <div class="dropdown-menu w-60">
      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
        <button
          data-dismiss="dropdown"
          @click="setRange(0)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
          >Today</button>
        <button
          data-dismiss="dropdown"
          @click="setRange(1)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
          >Yesterday</button>
        <button
          data-dismiss="dropdown"
          @click="setRange(7)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
          >Last 7 days</button>
        <button
          data-dismiss="dropdown"
          @click="setRange(30)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
          >Last 30 days</button>
        <button
          data-dismiss="dropdown"
          @click="setRange(10)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
          >This Month</button>
        <button
          data-dismiss="dropdown"
          @click="setRange(20)"
          class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
          >Last Month</button>

          <div id="dateRangepicker">
            <div>
              <Litepicker
                v-model="dateRange"
                @update:modelValue="search"
                :options="{
                  format:'DD-MM-YYYY',
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true
                  }
                }"
                class="form-control block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-left w-full"
              />
            </div>
          </div>
      </div>
    </div>
  </div>
</form>
</template>