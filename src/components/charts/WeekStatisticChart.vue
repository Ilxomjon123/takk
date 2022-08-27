<template>
  <div class="flex">
    <CafeSelect v-model="cafe" class="md:w-80" />
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
import CafeSelect from '../selects/CafeSelect.vue';

export default {
  async created() {
    this.fetchData();
  },
  data() {
    return {
      cafe: 0,
      type: '',
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
      this.fetchData(this.type);
    }
  },
  methods: {
    ...mapActions(['fetchStatisticsSalesWeek']),
    async fetchData(val) {
      this.type = val;
      let res;
      if (this.cafe != 0) {
        res = await this.fetchStatisticsSalesWeek({
          cafe: this.cafe,
          type: this.type
        });
      } else {
        res = await this.fetchStatisticsSalesWeek({
          type: this.type
        });
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
    CafeSelect
  }
};
</script>
