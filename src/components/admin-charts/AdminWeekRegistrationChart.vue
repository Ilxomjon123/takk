<template>
  <!-- <div class="flex">
    <CafeSelect v-model="cafe" />
    <button class="ml-auto btn btn-primary mr-2">
      <UserIcon />
    </button>
    <button class="btn btn-primary">
      <DollarSignIcon />
    </button>
  </div> -->
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
import CafeSelect from '../selects/CafeSelect.vue';

export default {
  async created() {
    await this.fetchData();
  },
  data() {
    return {
      cafe: 0,
      series: [
        {
          data: [],
          name: 'Last Week'
        },
        {
          data: [],
          name: 'This Week'
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
    ...mapActions(['adminCompany/fetchAdminStatisticsRegistrationWeek']),
    async fetchData() {
      try {
        let res;
        if (this.cafe != 0) {
          res = await this['adminCompany/fetchAdminStatisticsRegistrationWeek'](
            {
              cafe: this.cafe
            }
          );
        } else {
          res = await this[
            'adminCompany/fetchAdminStatisticsRegistrationWeek'
          ]();
        }
        if (res.status) {
          this.series[0].data = res.last;
          this.series[1].data = res.current;
          this.chartOptions.xaxis.categories = res.days;
        }
      } catch (error) {}
    }
  },
  components: {
    CafeSelect
  }
};
</script>
