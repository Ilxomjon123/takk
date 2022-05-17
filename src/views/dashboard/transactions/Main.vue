<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Transactions List</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
      <ExcelExportButton/>
        <div class="hidden md:block mx-auto text-gray-600"></div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <form @submit.prevent="search">
              <input
                v-model="form.search"
                type="text"
                class="form-control w-56 box pr-10 placeholder-theme-13"
                placeholder="Search..."
              />
              <SearchIcon
                class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 cursor-pointer"
                @click="search"
              />
            </form>
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">ID</th>
              <th class="whitespace-nowrap">CUSTOMER</th>
              <th class="whitespace-nowrap">LAST 4 DIGITS</th>
              <th class="whitespace-nowrap">CLIENT TYPE</th>
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
              <td v-text="item.brand" />
              <td v-text="item.cafe?.name" />
              <td v-text="''" />
              <td v-text="statuses[item.status]" />
              <td v-text="item.updated_dt" />
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
            <div class="font-medium">{{ order.updated }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MainPaginator from '../../../components/paginator/MainPaginator.vue'
import ExcelExportButton from '../../../components/buttons/ExcelExportButton.vue'

export default defineComponent({
  components: { MainPaginator, ExcelExportButton },
  data() {
    return {
      items: [],
      order: {},
      form: {},
      statuses: ['PAID', 'REFUND']
    }
  },
  methods: {
    setItems(val) {
      this.items = val
    },
    search() {
      this.$refs.paginator.paginate(1)
    },
    setOrder(val) {
      this.order = val.order;
      this.order['order_detail'] = val.order_detail;
    },
  }
})
</script>
