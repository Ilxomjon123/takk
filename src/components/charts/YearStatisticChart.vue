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
        yaxis: {
          labels: {
            formatter: (value, index) => {
              return Math.fround(value).toLocaleString();
            },
          },
        },
      },
    };
  },
  watch: {
    cafe(to, from) {
      this.fetchData(this.type);
    },
  },
  methods: {
    ...mapActions(['fetchStatisticsSalesYear']),
    async fetchData(type) {
      let res;
      this.type = type;
      const params = {
        cafe: this.cafe != 0 ? this.cafe : null,
        type: this.type || null,
      };

      res = await this.fetchStatisticsSalesYear(params);

      if (res.status) {
        this.series = [
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
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            categories: res.months.map((item) => this.toMonthName(item)),
          },
        };
      }
    },
  },
  components: {
    CafeSelect,
  },
};
</script>
