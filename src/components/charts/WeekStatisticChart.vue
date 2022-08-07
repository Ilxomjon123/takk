<script setup>
import { reactive, ref, watch } from 'vue';
import store from '../../store';
import CafeSelect from '../selects/CafeSelect.vue';

const cafe = ref(0);
const chartSeries = ref([
  {
    data: []
  },
  {
    data: []
  }
]);
const chartOptions = reactive({
  dataLabels: {
    enabled: true,
    enabledOnSeries: []
  },
  chart: {
    type: 'bar'
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories: ['Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sun', 'Sat']
  }
});

watch(
  () => cafe.value,
  (newVal, oldVal) => {
    console.log('ok in watch');
    fetchData();
  },
  { deep: true, immediate: true }
);

async function fetchData() {
  let res;
  if (cafe.value != 0) {
    res = await store.dispatch('fetchStatisticsSalesWeek', {
      cafe: cafe.value
    });
  } else {
    res = await store.dispatch('fetchStatisticsSalesWeek');
  }
  if (res.status) {
    chartSeries.value = [
      {
        // data: res.last_week.map(item => item.count),
        data: res.last.reverse(),
        name: 'Last Week'
      },
      {
        // data: res.this_week.map(item => item.count),
        data: res.current.reverse(),
        name: 'This Week'
      }
    ];
    chartOptions.xaxis.categories = res.days.reverse();
  }
}
</script>

<template>
  <div class="flex">
    <CafeSelect v-model="cafe" class="md:w-80" />
    <button class="ml-auto btn btn-primary mr-2">
      <UserIcon />
    </button>
    <button class="btn btn-primary">
      <DollarSignIcon />
    </button>
  </div>
  <div class="mt-2 bg-white">
    <apexchart
      id="week-sales-chart"
      width="100%"
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>
