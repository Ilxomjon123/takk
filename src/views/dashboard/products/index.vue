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
                    @click="$router.push('/dashboard/products/' + product.id)"
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" />Edit
                  </button>
                  <a
                    class="flex items-center text-theme-6"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#delete-confirmation-modal"
                    @click="clickedProductId = product.id"
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
import Toastify from 'toastify-js';
import cash from 'cash-dom';
import setLoading from '@/composable-functions/loading.js'

const products = reactive({});
const selectedProduct = reactive({});
const store = useStore()
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);
const clickedProductId = ref(null);

const paginator = reactive({
  page: ref(1),
  limit: ref(10),
  total: ref(0),
})

onMounted(() => {
  if (activeMenuID.value) {
    fetchProducts()
  }
})

async function fetchProducts() {
  store.commit('setLoadingStatus', true)
  // console.log('menuId: ' + menuId);
  try {
    const res = await fetchProductsList({
      menuId: activeMenuID.value,
      page: paginator.page,
      limit: paginator.limit
    })

    Object.assign(products, res)
    paginator.total = res.total_objects
  } catch (error) {
    Toastify({
      node: cash('#failed-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000,
    }).showToast();
  } finally {
    store.commit('setLoadingStatus', false)
  }
}

async function deleteObj() {
  cash('#delete-confirmation-modal').modal('hide')
  store.commit('setLoadingStatus', true)
  await deleteProduct(clickedProductId.value)
  await fetchProducts()
  store.commit('setLoadingStatus', false)
}

async function paginate(val) {
  // store.commit('setLoadingStatus', true)
  setLoading(true);
  paginator.page = val
  await fetchProducts();
  // store.commit('setLoadingStatus', false)
  setLoading(false);
}

async function changePerPage(val) {
  store.commit('setLoadingStatus', true)
  paginator.limit = val;
  paginator.page = 1;
  await fetchProducts();
  store.commit('setLoadingStatus', false)
}
</script>

<style scoped lang="scss">
.active-menu {
  @apply bg-theme-1 dark:bg-theme-1;
}
</style>
