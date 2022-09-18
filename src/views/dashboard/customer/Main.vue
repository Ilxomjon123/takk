<script setup>
import { reactive, ref } from 'vue';
import MainPaginator from '@/components/paginator/MainPaginator.vue';
import SearchProduct from '@/components/forms/SearchProduct.vue';
import { useNotyf } from '@/composables/useNotyf';
import store from '../../../store';

const notyf = useNotyf();
const isLoading = ref(false);
const items = ref([]);
const paginator = ref(null);
const form = reactive([]);

function setItems(val) {
  items.value = val;
}

async function handleSearchEvent(value) {
  isLoading.value = true;
  try {
    if (value.length === 0 || value.length > 2) {
      const res = await store.dispatch('fetchCustomers', {
        page: paginator.page,
        limit: paginator.limit,
        search: value,
      });

      if (res) {
        items.value = res.results;
        paginator.total = res.total_objects;
      }
    }
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function handleSearchSubmit(value) {
  isLoading.value = true;
  try {
    const res = await store.dispatch('fetchCustomers', {
      page: paginator.page,
      limit: paginator.limit,
      search: value,
    });

    if (res) {
      items.value = res.results;
      paginator.total = res.total_objects;
    }
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <h2 class="text-lg font-medium mt-5">Customers List</h2>
    <div class="flex items-center">
      <div class="dropdown">
        <button
          class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
          aria-expanded="false"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </button>
        <div class="dropdown-menu w-40">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <a
              class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <PrinterIcon class="w-4 h-4 mr-2" />Print
            </a>
            <a
              class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <FileTextIcon class="w-4 h-4 mr-2" />Export to Excel
            </a>
            <a
              class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <FileTextIcon class="w-4 h-4 mr-2" />Export to PDF
            </a>
          </div>
        </div>
      </div>
      <div class="ml-auto">
        <SearchProduct
          class=""
          :loading="isLoading"
          @searching="handleSearchEvent"
          @search:manual="handleSearchSubmit"
        />
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 overflow-auto">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">ID</th>
              <th class="whitespace-nowrap">USERNAME</th>
              <th class="whitespace-nowrap">PHONE</th>
              <th class="whitespace-nowrap">EMAIL</th>
              <th class="whitespace-nowrap">JOINED DATE</th>
              <th class="whitespace-nowrap">ORDER COUNT</th>
              <th class="whitespace-nowrap">TOTAL PRICE</th>
              <th class="whitespace-nowrap">LAST ORDER</th>
              <th class="whitespace-nowrap">OS TYPE</th>
              <th class="whitespace-nowrap">FREE ITEMS COUNT</th>
              <th class="whitespace-nowrap">POINTS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td v-text="item.id" />
              <td v-text="item.username" />
              <td v-text="item.phone" />
              <td v-text="item.email" />
              <td v-text="item.date_joined" />
              <td v-text="item.order_count" />
              <td v-text="item.orders_total_price" />
              <td v-text="item.os_type" />
              <td v-text="item.last_order_date" />
              <td v-text="item.free_items_count" />
              <td v-text="item.points" />
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <MainPaginator
        dispatcher="fetchCustomers"
        ref="paginator"
        @setItems="setItems($event)"
        :form="form"
      />
      <!-- END: Pagination -->
    </div>
  </div>
</template>
