<script setup>
import { reactive, ref, watch } from 'vue';
import { useNotyf } from '@/composables/useNotyf';
import store from '@/store';
import { helper } from '@/utils/helper';
import AdminCafeSelect from '../selects/AdminCafeSelect.vue';

const notyf = useNotyf();
const cafe = ref(0);
const type = ref(null);
const chart = reactive({
  series: [
    {
      data: [],
    },
    {
      data: [],
    },
  ],
  options: {
    dataLabels: {
      enabled: true,
      enabledOnSeries: [],
    },
    chart: {
      type: 'bar',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      // categories: [],
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  },
});

watch(
  () => cafe.value,
  async (newVal) => {
    await fetchData();
  },
  { immediate: true }
);

watch(
  () => type.value,
  async (newVal) => {
    await fetchData();
  },
  { immediate: true }
);

async function fetchData() {
  try {
    let res;

    if (cafe.value != 0) {
      res = await store.dispatch('adminCompany/fetchAdminStatisticsSalesYear', {
        cafe: cafe.value,
        type: type.value,
      });
    } else {
      res = await store.dispatch('adminCompany/fetchAdminStatisticsSalesYear', {
        type: type.value,
      });
    }

    console.log({ res });

    chart.series = [
      {
        // data: res.last_year.map(item => item.count),
        data: res.last,
        name: 'Last Year',
      },
      {
        // data: res.this_year.map(item => item.count),
        data: res.current,
        name: 'This Year',
      },
    ];
    chart.options = {
      ...chart.options,
      xaxis: {
        categories: res.months?.map((item) => helper.toMonthName(item)),
      },
    };
  } catch (error) {
    console.log({ error });
    notyf.error('Error while fetching first chart data: ' + error.message);
  }
}
</script>

<template>
  <div class="flex">
    <AdminCafeSelect v-model="cafe" class="md:w-80" />
    <button class="ml-auto btn btn-primary mr-2" @click="type = 'users'">
      <UserIcon />
    </button>
    <button class="btn btn-primary" @click="type = null">
      <DollarSignIcon />
    </button>
  </div>
  <div class="mt-2 bg-white">
    <apexchart
      id="year-sales-chart"
      width="100%"
      type="bar"
      :series="chart.series"
      :options="chart.options"
    />
  </div>
</template>
