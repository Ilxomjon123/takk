<script setup>
import { reactive, ref } from 'vue';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';
import MainPaginator from '@/components/paginator/MainPaginator.vue';
import ExcelExportButton from '@/components/buttons/ExcelExportButton.vue';
import DateRangePicker from '@/components/forms/DateRangePicker.vue';
import SearchProduct from '@/components/forms/SearchProduct.vue';
import moment from 'moment';
const notyf = useNotyf();
const items = ref([]),
  order = reactive({}),
  form = reactive({
    start_date: '',
    end_date: '',
    search: '',
  }),
  paginator = ref(null),
  statuses = ref(['PAID', 'REFUND']),
  exportUrl = import.meta.env.VITE_ADMIN_API_URL + '/transactions/export/';
const isLoading = ref(false);

function setItems(val) {
  items.value = val;
}

async function search(dateRangeObj) {
  form.start_date = dateRangeObj.start;
  form.end_date = dateRangeObj.end;
  await paginator.value.paginate(1, form);
}

function setOrder(val) {
  Object.assign(order, val.order);
  order['order_detail'] = val.order_detail;
}

async function handleSearchEvent(value) {
  isLoading.value = true;
  const fetchList = 'fetchTransactions';

  try {
    if (value.length === 0 || value.length > 2) {
      form.search = value;
      await paginator.value.paginate(1, form);
    }
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function handleSearchSubmit(value) {
  isLoading.value = true;
  const fetchList = 'fetchTransactions';

  try {
    form.search = value;
    await paginator.value.paginate(1, form);
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <div>
      <h2 class="text-lg font-medium mt-5">Transactions List</h2>
      <div class="flex flex-col md:flex-row items-center gap-5 my-5">
        <ExcelExportButton :form="form" />
        <!-- search input -->
        <div class="flex flex-col md:flex-row items-center gap-5 sm:ml-auto">
          <SearchProduct
            :loading="isLoading"
            @searching="handleSearchEvent"
            @search:manual="handleSearchSubmit"
          />
          <DateRangePicker class="whitespace-nowrap" @submit="search" />
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="grid grid-cols-12 gap-5">
        <div class="intro-y col-span-12 overflow-auto">
          <table class="table table-report -mt-2">
            <thead>
              <tr>
                <th class="whitespace-nowrap">ID</th>
                <th class="whitespace-nowrap">CUSTOMER</th>
                <th class="whitespace-nowrap">LAST 4 DIGITS</th>
                <th class="whitespace-nowrap">OS TYPE</th>
                <th class="whitespace-nowrap">CAFE NAME</th>
                <th class="whitespace-nowrap">NET PROCEEDS</th>
                <th class="whitespace-nowrap">STATUS</th>
                <th class="whitespace-nowrap">TRANSACTION DATE</th>
                <th class="whitespace-nowrap">ORDERS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td v-text="item.id" />
                <td v-text="item.customer?.username" />
                <td v-text="item.last4" />
                <td v-text="item.os_type" />
                <td v-text="item.cafe?.name" />
                <td v-text="item.net_proceeds" />
                <td v-text="item.state" />
                <td v-text="moment(item.updated_dt).format('DD MMM yyyy')" />
                <td>
                  <a
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#order-detail-modal"
                    @click="setOrder(item)"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- END: Data List -->
        <!-- BEGIN: Pagination -->
        <MainPaginator
          dispatcher="fetchTransactions"
          @setItems="setItems($event)"
          ref="paginator"
          :form="form"
        />
        <!-- END: Pagination -->
      </div>
    </div>

    <!-- modals -->
    <div id="order-detail-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="flex">
              <div class="mr-auto text-base">ID</div>
              <div class="font-medium">{{ order.id }}</div>
            </div>
            <div class="mt-4">
              <div class="text-base">Order Detail</div>
              <div class="font-medium ml-auto" v-html="order.order_detail" />
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Total Price</div>
              <div class="font-medium">{{ order.total_price }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Status</div>
              <div class="font-medium">{{ order.status }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Sub Total Price</div>
              <div class="font-medium">{{ order.sub_total_price }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Delivery Price</div>
              <div class="font-medium">{{ order.delivery_price }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Cashback</div>
              <div class="font-medium">{{ order.cashback }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Total Tax</div>
              <div class="font-medium">{{ order.tax_total }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Tip</div>
              <div class="font-medium">{{ order.tip }}</div>
            </div>
            <div class="flex mt-4">
              <div class="mr-auto text-base">Updated Time</div>
              <div class="font-medium">
                {{ moment(order.updated_dt).format('DD MMM yyyy') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
