<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Transactions List</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
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
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <PrinterIcon class="w-4 h-4 mr-2" />Print
              </a>
              <a
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileTextIcon class="w-4 h-4 mr-2" />Export to Excel
              </a>
              <a
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileTextIcon class="w-4 h-4 mr-2" />Export to PDF
              </a>
            </div>
          </div>
        </div>
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
                  @click="setOrder(item.order)"
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
            <div class="mr-auto">ID</div>
            <div class="font-medium">{{ order.id }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Total Price</div>
            <div class="font-medium">{{ order.total_price }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Status</div>
            <div class="font-medium">{{ order.status }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Sub Total Price</div>
            <div class="font-medium">{{ order.sub_total_price }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Delivery Price</div>
            <div class="font-medium">{{ order.delivery_price }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Cashback</div>
            <div class="font-medium">{{ order.cashback }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Total Tax</div>
            <div class="font-medium">{{ order.tax_total }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Tip</div>
            <div class="font-medium">{{ order.tip }}</div>
          </div>
          <div class="flex mt-4">
            <div class="mr-auto">Updated Time</div>
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

export default defineComponent({
  components: { MainPaginator },
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
      this.order = val;
    },
  }
})
</script>
