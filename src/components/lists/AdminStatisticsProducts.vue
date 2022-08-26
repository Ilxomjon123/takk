<script setup>
import { useStore } from 'vuex';
import AdminCafeSelect from '../selects/AdminCafeSelect.vue';
import DateRangePicker from '../forms/DateRangePicker.vue';
import { computed } from 'vue';
import NoData from '../NoData.vue';
const store = useStore();

const list = computed(
  () => store.getters['adminCompany/getAdminStatisticProducts']
);

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
  store.dispatch('adminCompany/fetchAdminStatisticsProducts', form);
}
</script>

<template>
  <div class="flex">
    <AdminCafeSelect class="md:w-80" @update:model-value="changeCafe" />
    <DateRangePicker class="mt-2 ml-auto" @submit="changeDateRange" />
  </div>
  <div class="mt-3 overflow-auto lg:overflow-visible">
    <table class="table table-report">
      <thead>
        <th class="whitespace-nowrap">Product</th>
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
                  :src="item.product.image"
                />
              </div>
              <div class="ml-4 mr-auto">
                <div>
                  {{ item.product.name }}
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
