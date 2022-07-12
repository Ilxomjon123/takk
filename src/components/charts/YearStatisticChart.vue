<template>
  <div>
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
import { mapActions } from 'vuex';
import ApexCharts from 'apexcharts';
export default {
  async created(){
    const res = await this.fetchStatisticsSalesYear();

    if(res.status){
      this.series = [
        {data: res.last_year.map(item => item.count), name: 'Last Year'},
        {data: res.this_year.map(item => item.count), name: 'This Year'},
      ];
    }
    this.isReady = true;
  },
  methods:{
    ...mapActions(['fetchStatisticsSalesYear']),
  },
  data() {
    return {
      isReady: false,
      series: [
        {data: []},
        {data: []},
      ],
      chartOptions: {
        dataLabels: {
          enabled: true,
          enabledOnSeries: []
        },
        chart: {
          type: 'bar',
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      },
    };
  },
};
</script>