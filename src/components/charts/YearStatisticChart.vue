<template>
  <CafeSelect v-model="cafe"/>
  <div class="mt-2">
    <apexchart v-if="isReady"
      id="year-sales-chart"
      width="100%"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import CafeSelect from '../selects/CafeSelect.vue';
export default {
  async created() {
    this.fetchData();
  },
  data() {
    return {
      cafe: '0',
      isReady: false,
      series: [{
          data: []
        },
        {
          data: []
        },
      ],
      chartOptions: {
        dataLabels: {
          enabled: true,
          enabledOnSeries: []
        },
        chart: {
          type: "bar",
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
      },
    };
  },
  watch: {
    cafe(to, from) {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions(["fetchStatisticsSalesYear"]),
    async fetchData(){
      let res;
      if(this.cafe != 0){
        res = await this.fetchStatisticsSalesYear({cafe: this.cafe});
      } else {
        res = await this.fetchStatisticsSalesYear();
      }
      if (res.status) {
        this.series = [{
            data: res.last_year.map(item => item.count),
            name: "Last Year"
          },
          {
            data: res.this_year.map(item => item.count),
            name: "This Year"
          },
        ];
      }
      this.isReady = true;
    }
  },
  components: {
    CafeSelect
  }
};
</script>