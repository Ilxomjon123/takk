<script setup>
import YearStatisticChart from '@/components/charts/YearStatisticChart.vue';
import WeekStatisticChart from '@/components/charts/WeekStatisticChart.vue';
import YearTransactionChart from '@/components/charts/YearTransactionChart.vue';
import WeekTransactionChart from '@/components/charts/WeekTransactionChart.vue';
import YearRegistrationChart from '@/components/charts/YearRegistrationChart.vue';
import WeekRegistrationChart from '@/components/charts/WeekRegistrationChart.vue';
import StatisticsCustomers from '@/components/lists/StatisticsCustomers.vue';
import StatisticsProducts from '@/components/lists/StatisticsProducts.vue';
</script>

<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Dashboard</h2>
    </div>
    <div class="intro-y grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Sales Overview</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="vertical-bar-chart" class="p-5">
            <div class="preview">
              <YearStatisticChart />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Sales Overview</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="horizontal-bar-chart" class="p-5">
            <div class="preview">
              <WeekStatisticChart />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">
              User Regisrations Overview
            </h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="vertical-bar-chart" class="p-5">
            <div class="preview">
              <YearRegistrationChart />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">
              User Regisrations Overview
            </h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="horizontal-bar-chart" class="p-5">
            <div class="preview">
              <WeekRegistrationChart />
            </div>
          </div>
        </div>
      </div> -->
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Transactions Overview</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="vertical-bar-chart" class="p-5">
            <div class="preview">
              <YearTransactionChart />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Transactions Overview</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="horizontal-bar-chart" class="p-5">
            <div class="preview">
              <WeekTransactionChart />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Most sold Products</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="vertical-bar-chart" class="p-5">
            <div class="preview">
              <StatisticsProducts />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Best Customers</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            ></div>
          </div>
          <div id="horizontal-bar-chart" class="p-5">
            <div class="preview">
              <StatisticsCustomers />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
