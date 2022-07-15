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
import { mapActions } from 'vuex';
import ApexCharts from 'apexcharts';
import CafeSelect from '../selects/CafeSelect.vue';
export default {
    async created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(["fetchStatisticsSalesWeek"]),
        async fetchData() {
            let res;
            if (this.cafe != 0) {
                res = await this.fetchStatisticsSalesWeek({ cafe: this.cafe });
            }
            else {
                res = await this.fetchStatisticsSalesWeek();
            }
            if (res.status) {
                this.series = [
                    { data: res.last_week.map(item => item.count), name: "Last Week" },
                    { data: res.this_week.map(item => item.count), name: "This Week" },
                ];
            }
            this.isReady = true;
        }
    },
    data() {
        return {
            cafe: '0',
            isReady: false,
            series: [
                { data: [] },
                { data: [] },
            ],
            chartOptions: {
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: []
                },
                chart: {
                    type: "bar",
                    width: 500
                },
                tooltip: {
                    shared: true,
                    intersect: false
                },
                xaxis: {
                    categories: ["Mon", "Thu", "Wed", "Thr", "Fri", "Sun", "Sat"],
                },
            },
        };
    },
    watch: {
        cafe(to, from) {
            this.fetchData();
        }
    },
    components: { CafeSelect }
};
</script>