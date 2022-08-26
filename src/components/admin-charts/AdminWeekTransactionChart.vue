<template>
  <!-- <div class="flex"> -->
  <AdminCafeSelect v-model="cafe" />
  <!-- <button class="ml-auto btn btn-primary mr-2">
      <UserIcon />
    </button>
    <button class="btn btn-primary">
      <DollarSignIcon />
    </button> -->
  <!-- </div> -->
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
    this.fetchData();
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
          // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        }
      }
    };
  },
  watch: {
    cafe(to, from) {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions(['adminCompany/fetchAdminStatisticsTransactionWeek']),
    async fetchData() {
      let res;
      if (this.cafe != 0) {
        res = await this['adminCompany/fetchAdminStatisticsTransactionWeek']({
          cafe: this.cafe
        });
      } else {
        res = await this['adminCompany/fetchAdminStatisticsTransactionWeek']();
      }
      if (res.status) {
        this.series = [
          {
            // data: res.last_year.map(item => item.count),
            data: res.last.reverse(),
            name: 'Last Week'
          },
          {
            // data: res.this_year.map(item => item.count),
            data: res.current.reverse(),
            name: 'This Week'
          }
        ];
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            categories: res.days.reverse()
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
