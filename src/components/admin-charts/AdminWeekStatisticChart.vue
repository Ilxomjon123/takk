<template>
  <div class="flex">
    <AdminCafeSelect v-model="cafe" class="md:w-80" />
    <button class="ml-auto btn btn-primary mr-2" @click="fetchData('users')">
      <UserIcon />
    </button>
    <button class="btn btn-primary" @click="fetchData('')">
      <DollarSignIcon />
    </button>
  </div>
  <div class="mt-2 bg-white">
    <apexchart
      id="week-sales-chart"
      width="100%"
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AdminCafeSelect from '../selects/AdminCafeSelect.vue';

export default {
  async created() {
    await this.fetchData();
  },
  data() {
    return {
      cafe: 0,
      type: '',
      series: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      chartOptions: {
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
          categories: [],
          // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
      },
    };
  },
  watch: {
    async cafe(to, from) {
      await this.fetchData(this.type);
    },
  },
  methods: {
    ...mapActions(['adminCompany/fetchAdminStatisticsSalesWeek']),
    async fetchData(val) {
      this.type = val;
      let res;
      const params = {
        cafe: this.cafe != 0 ? this.cafe : null,
        type: this.type || null,
      };

      res = await this['adminCompany/fetchAdminStatisticsSalesWeek'](params);

      if (res.status) {
        this.series = [
          {
            // data: res.last_year.map(item => item.count),
            data: res.last,
            name: 'Last Week',
          },
          {
            // data: res.this_year.map(item => item.count),
            data: res.current,
            name: 'This Week',
          },
        ];
        this.chartOptions = {
          xaxis: {
            categories: res.days,
          },
        };
      }
    },
  },
  components: {
    AdminCafeSelect,
  },
};
</script>
