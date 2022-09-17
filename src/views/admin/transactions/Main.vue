<script setup>
import { ref, reactive } from 'vue';
import MainPaginator from '@/components/paginator/MainPaginator.vue';
import ExcelExportButton from '@/components/buttons/ExcelExportButton.vue';
import DateRangePicker from '@/components/forms/DateRangePicker.vue';

const items = ref([]),
  order = reactive({}),
  form = reactive({
    start: '',
    end: '',
  }),
  paginator = ref(null),
  statuses = ref(['PAID', 'REFUND']);

function setItems(val) {
  items.value = val;
}

async function search(dateRangeObj) {
  form.start = dateRangeObj.start;
  form.end = dateRangeObj.end;
  await paginator.value.paginate(1, form);
}

function setOrder(val) {
  Object.assign(order, val.order);
  order['order_detail'] = val.order_detail;
}
</script>

<template>
  <div>
    <div>
      <h2 class="intro-y text-lg font-medium mt-10">Transactions List</h2>
      <div class="intro-y flex items-center mt-5">
        <ExcelExportButton url="/adham/transactions/export/" :form="form" />
        <DateRangePicker class="ml-auto" @submit="search" />
      </div>
      <!-- BEGIN: Data List -->
      <div class="grid grid-cols-12 gap-6 mt-5">
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
                <td v-text="new Date(item.updated_dt)" />
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
          dispatcher="adminCompany/fetchAdminTransactions"
          @setItems="setItems($event)"
          ref="paginator"
          :form="form"
        />
        <!-- END: Pagination -->
      </div>
    </div>
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
              <div class="font-medium">{{ new Date(order.updated_dt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
