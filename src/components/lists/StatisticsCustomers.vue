<script setup>
import { useStore } from 'vuex';
import CafeSelect from '../selects/CafeSelect.vue';
import DateRangePicker from '../forms/DateRangePicker.vue';
import NoData from '../NoData.vue';
import { computed } from 'vue';
const store = useStore();

const list = computed(() => store.getters.getStatisticCustomers);

const form = {};

function changeDateRange(range) {
  form.start = range.start;
  form.end = range.end;
  fetchData();
}

function changeCafe(cafe) {
  delete form['cafe'];
  if (cafe != 0) {
    form.cafe = cafe;
  } else {
    delete form['cafe'];
  }
  fetchData();
}

function fetchData() {
  store.dispatch('fetchStatisticsCustomer', form);
}
</script>

<template>
  <div class="flex flex-col sm:flex-row">
    <CafeSelect
      class="md:w-72 lg:w-40 xl:w-56"
      @update:modelValue="changeCafe"
    />
    <DateRangePicker
      class="sm:mt-2.5 mt-5 sm:ml-auto"
      @submit="changeDateRange"
    />
  </div>
  <div class="mt-3 overflow-auto lg:overflow-visible">
    <table class="table table-report">
      <thead>
        <th class="whitespace-nowrap">User</th>
        <th class="whitespace-nowrap">Quantity</th>
        <th class="whitespace-nowrap">Amount</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" class="zoom-in">
          <td>
            <div class="relative flex items-center">
              <div class="w-10 h-10 image-fit">
                <img
                  alt="cafe_logo"
                  class="rounded-full"
                  :src="item.user.avatar"
                />
              </div>
              <div class="ml-4 mr-auto">
                <div>
                  {{ item.user.username }}
                </div>
              </div>
            </div>
          </td>
          <td v-text="item.quantity" />
          <td v-text="item.amount" />
        </tr>
      </tbody>
    </table>
    <NoData v-if="list.length == 0" />
  </div>
</template>
