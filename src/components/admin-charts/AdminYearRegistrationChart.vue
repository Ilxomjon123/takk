<template>
  <!-- <div class="flex">
    <AdminCafeSelect v-model="cafe"/>
    <button class="ml-auto btn btn-primary mr-2">
      <UserIcon />
    </button>
    <button class="btn btn-primary">
      <DollarSignIcon />
    </button>
  </div> -->
  <div class="mt-2 bg-white">
    <apexchart
      id="year-sales-chart"
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
      series: [
        {
          data: []
        },
        {
          data: []
        }
      ],
      chartOptions: {
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
          categories: []
          // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        }
      }
    };
  },
  watch: {
    async cafe(to, from) {
      await this.fetchData();
    }
  },
  methods: {
    ...mapActions(['adminCompany/fetchAdminStatisticsRegistrationYear']),
    async fetchData() {
      let res;
      if (this.cafe != 0) {
        res = await this['adminCompany/fetchAdminStatisticsRegistrationYear']({
          cafe: this.cafe
        });
      } else {
        res = await this['adminCompany/fetchAdminStatisticsRegistrationYear']();
      }
      if (res.status) {
        this.series = [
          {
            // data: res.last_year.map(item => item.count),
            data: res.last,
            name: 'Last Year'
          },
          {
            // data: res.this_year.map(item => item.count),
            data: res.current,
            name: 'This Year'
          }
        ];
        this.chartOptions = {
          xaxis: {
            categories: res.months?.map(item => this.toMonthName(item))
          }
        };
      }
    }
  },
  components: {
    AdminCafeSelect
  }
};
</script>
