<template>
  <div>
    <!-- Menu List start -->
    <MenuList
      @update-id="fetchProducts"
      sub-item-title="Products"
      sub-item-value="product_count"
    />
    <!-- Menu List end -->
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <h2 class="intro-y col-span-12 text-lg font-medium mt-10">Products List</h2>
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <RouterLink to="/dashboard/products/add" class="btn btn-primary mr-3">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
          Add Product
        </RouterLink>
        <!-- <div class="dropdown">
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
              <PlusIcon class="w-4 h-4 mr-2" />New User
            </a>
            <a
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <PlusIcon class="w-4 h-4 mr-2" />Exiscting User
            </a>
          </div>
        </div>
        </div>-->
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">IMAGES</th>
              <th class="whitespace-nowrap">PRODUCT NAME</th>
              <th class="text-center whitespace-nowrap">POSITION</th>
              <th class="text-center whitespace-nowrap">DESCRIPTION</th>
              <th class="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, productKey) in products.results"
              :key="productKey"
              class="intro-x"
            >
              <td>
                <div class="w-20 h-20 image-fit zoom-in">
                  <img
                    alt="Icewall Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="product.image"
                  />
                </div>
              </td>
              <td>
                <a href class="font-medium whitespace-nowrap">{{ product.name }}</a>
                <div
                  class="text-gray-600 text-xs whitespace-nowrap mt-0.5"
                >{{ product.category?.name }}</div>
              </td>
              <td class="text-center">{{ product.position }}</td>
              <td class>{{ product.description }}</td>
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <button
                    class="flex items-center mr-3"
                    @click="clickedProductId = product.id"
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" />Edit
                  </button>
                  <a
                    class="flex items-center text-theme-6"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#delete-confirmation-modal"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" />Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <Pagination
        :total="paginator.total"
        :currentPage="paginator.page"
        :perPage="paginator.limit"
        @paginate="paginate($event)"
        @changePerPage="changePerPage($event)"
      />
      <!-- END: Pagination -->
    </div>
  </div>
  <!-- BEGIN: Add Product Modal -->
  <div id="add-item-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">{{ selectedProduct.name }}</h2>
        </div>
        <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
          <div class="col-span-12">
            <label for="pos-form-4" class="form-label">Quantity</label>
            <div class="flex mt-2 flex-1">
              <button
                type="button"
                class="btn w-12 border-gray-300 bg-gray-200 dark:bg-dark-1 text-gray-600 dark:text-gray-300 mr-1"
              >-</button>
              <input
                id="pos-form-4"
                type="text"
                class="form-control w-24 text-center"
                placeholder="Product quantity"
                value="2"
              />
              <button
                type="button"
                class="btn w-12 border-gray-300 bg-gray-200 dark:bg-dark-1 text-gray-600 dark:text-gray-300 ml-1"
              >+</button>
            </div>
          </div>
          <div class="col-span-12">
            <label for="pos-form-5" class="form-label">Notes</label>
            <textarea
              id="pos-form-5"
              class="form-control w-full mt-2"
              placeholder="Product notes"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer text-right">
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-outline-secondary w-24 mr-1"
          >Cancel</button>
          <button type="button" class="btn btn-primary w-24">Add Product</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Add Product Modal -->
  <!-- BEGIN: Delete Confirmation Modal -->
  <div
    id="delete-confirmation-modal"
    class="modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to delete these records?
              <br />This process cannot be undone.
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 mr-1"
            >Cancel</button>
            <button
              type="button"
              class="btn btn-danger w-24"
              @click="deleteObj"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Delete Confirmation Modal -->
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import MenuList from '@/components/lists/MenuList.vue'
import { fetchProductsList, deleteProduct } from '@/api';
import Pagination from '@/components/paginator/Pagination.vue';

const products = reactive({});
const selectedProduct = reactive({});
const store = useStore()
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);
const clickedProductId = ref(null);

const paginator = reactive({
  page: ref(1),
  limit: ref(10),
  total: ref(null),
})

onMounted(() => {
  if (activeMenuID.value) {
    fetchProducts()
  }
})

async function fetchProducts() {
  store.commit('setLoadingStatus', true)
  // console.log('menuId: ' + menuId);
  const res = await fetchProductsList({
    menuId: activeMenuID.value,
    page: paginator.page,
    limit: paginator.limit
  })
  Object.assign(products, res)
  paginator.total = res.total_objects
  store.commit('setLoadingStatus', false)
}

async function deleteObj() {
  store.commit('setLoadingStatus', true)
  cash('#delete-confirmation-modal').modal('hide')
  await deleteProduct()
  store.commit('setLoadingStatus', false)
}

async function paginate(val) {
  paginator.page = val
  await fetchProducts();
}

async function changePerPage(val) {
  paginator.limit = val;
  paginator.page = 1;
  await fetchProducts();
}
</script>

<style scoped lang="scss">
.active-menu {
  @apply bg-theme-1 dark:bg-theme-1;
}
</style>
