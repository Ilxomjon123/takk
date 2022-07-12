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
    const res = await this.fetchStatisticsSalesWeek();

    if(res.status){
      this.series = [
        {data: res.last_week.map(item => item.count), name: 'Last Week'},
        {data: res.this_week.map(item => item.count), name: 'This Week'},
      ];
    }
    this.isReady = true;
  },
  methods:{
    ...mapActions(['fetchStatisticsSalesWeek']),
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
          width: 500
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sun', 'Sat'],
        },
      },
    };
  },
};
</script>