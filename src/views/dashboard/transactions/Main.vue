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
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
            />
            <SearchIcon
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
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
              <th class="whitespace-nowrap">ORDER</th>
              <th class="whitespace-nowrap">CAFE</th>
              <th class="whitespace-nowrap">CREATED AT</th>
              <th class="whitespace-nowrap">UPDATED AT</th>
              <th class="whitespace-nowrap">ORDER DETAILS</th>
              <th class="whitespace-nowrap">LAST ORDER</th>
              <th class="whitespace-nowrap">LAST4</th>
              <th class="whitespace-nowrap">BRAND</th>
              <th class="whitespace-nowrap">PAYMENT ID</th>
              <th class="whitespace-nowrap">AMOUNT</th>
              <th class="whitespace-nowrap">TAKK FEE</th>
              <th class="whitespace-nowrap">STRIPE FEE</th>
              <th class="whitespace-nowrap">CUSTOMER CASHBACK</th>
              <th class="whitespace-nowrap">PAYMENT TYPE</th>
              <th class="whitespace-nowrap">STATUS</th>
              <th class="whitespace-nowrap">IS CAPTURE</th>
              <th class="whitespace-nowrap">IS TRANSFER</th>
              <th class="whitespace-nowrap">EMPLOYEE</th>
              <th class="whitespace-nowrap">CARD</th>
              <th class="whitespace-nowrap">FINAL TRANSACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td v-text="item.id" />
              <td v-text="item.customer.username" />
              <td v-text="item.order" />
              <td v-text="item.cafe" />
              <td v-text="item.created_dt" />
              <td v-text="item.updated_dt" />
              <td v-text="item.order_detail" />
              <td v-text="item.last4" />
              <td v-text="item.brand" />
              <td v-text="item.payment_id" />
              <td v-text="item.amount" />
              <td v-text="item.takk_fee" />
              <td v-text="item.stripe_fee" />
              <td v-text="item.customer_cashback" />
              <td v-text="item.payment_type" />
              <td v-text="item.status" />
              <td v-text="item.is_capture" />
              <td v-text="item.is_transfer" />
              <td v-text="item.employee" />
              <td v-text="item.card" />
              <td v-text="item.final_transaction" />
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <MainPaginator
        dispatcher="fetchTransactions"
        @paginate="paginate($event)"
      />
      <!-- END: Pagination -->
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
      items: []
    }
  },
  methods: {
    paginate(val) {
      this.items = val
    }
  }
})
</script>
