<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import MenuList from '@/components/lists/MenuList.vue'
import { fetchProductsList, updateProductPositions } from '@/api';
import Pagination from '@/components/paginator/Pagination.vue';
import Toastify from 'toastify-js';
import cash from 'cash-dom';
import { useRouter } from 'vue-router';
import DraggableList from './DraggableList.vue';
import SearchProduct from './SearchProduct.vue';

const store = useStore()
const router = useRouter()
const products = reactive({});
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);
const clickedProductId = ref(null);
const isReordered = ref(false);

const paginator = reactive({
  page: ref(1),
  limit: ref(10),
  total: ref(0),
})

onMounted(() => {
  if (activeMenuID.value) {
    fetchProducts();
  }
})

async function fetchProducts() {
  store.commit('setLoadingStatus', true)
  try {
    const res = await fetchProductsList({
      menuId: activeMenuID.value,
      page: paginator.page,
      limit: paginator.limit,
      search: ''
    })

    if (res) {
      Object.assign(products, res)
      paginator.total = res.total_objects
    }
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

async function paginate(val) {
  store.commit('setLoadingStatus', true)
  paginator.page = val
  await fetchProducts();
  store.commit('setLoadingStatus', false)
}

async function changePerPage(val) {
  store.commit('setLoadingStatus', true)
  paginator.limit = val;
  paginator.page = 1;
  await fetchProducts();
  store.commit('setLoadingStatus', false)
}

function gotoAddPage() {
  router.push('/dashboard/products/add')
}

async function saveReorderedList() {
  store.commit('setLoadingStatus', true)
  try {
    const res = await updateProductPositions({
      obj_type: "product",
      obj_list: products.results.map((item, itemIndex) => ({ id: item.id, position: itemIndex + 1 + (paginator.page - 1) * paginator.limit }))
    });

    if (res) {
      isReordered.value = false
      fetchProducts()
    }
  } catch (error) {
    console.log(error);
  } finally {
    store.commit('setLoadingStatus', false)
  }
}

async function handleSearchEvent(value) {
  store.commit('setLoadingStatus', true)
  try {
    const res = await fetchProductsList({
      menuId: activeMenuID.value,
      page: paginator.page,
      limit: paginator.limit,
      search: value
    })

    if (res) {
      Object.assign(products, res)
      paginator.total = res.total_objects
    }
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
</script>

<template>
  <div>
    <!-- Menu List start -->
    <MenuList @update-id="fetchProducts" sub-item-title="Products" sub-item-value="product_count" />
    <!-- Menu List end -->
    <div class="intro-y flex flex-col sm:flex-row items-center gap-5 mt-10">
      <h2 class="text-lg font-medium">Products List</h2>
      <div class="intro-y flex flex-wrap sm:flex-nowrap items-center">
        <button class="btn btn-primary mr-3 flex align-middle" @click="gotoAddPage" :disabled="!activeMenuID">
          <span class="flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
          <span class="ml-3">Add Product</span>
        </button>
        <!-- <button class="btn btn-primary mr-3" @click="saveReorderedList" :disabled="!isReordered">
          <span class="flex items-center justify-center">
            <ShuffleIcon />
          </span>
          Save positions
        </button> -->
        <SearchProduct @searching="handleSearchEvent" />
      </div>
    </div>
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <!-- <DraggableList :list="products.results" /> -->
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <!-- <th>SELECT FOR DUPLICATE</th> -->
              <th>AVAILABLE</th>
              <th class="whitespace-nowrap">IMAGES</th>
              <th class="whitespace-nowrap">PRODUCT NAME</th>
              <th class="text-center whitespace-nowrap">POSITION</th>
              <th class="text-center whitespace-nowrap">DESCRIPTION</th>
              <th class="text-center whitespace-nowrap w-5">ACTIONS</th>
            </tr>
          </thead>
          <DraggableList :list="products.results" @reorder:list="saveReorderedList" @update:list="fetchProducts" />
          <!-- <DraggableList :list="products.results" @update:list="isReordered = true" /> -->
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <Pagination :total="paginator.total" :currentPage="paginator.page" :perPage="paginator.limit"
        @paginate="paginate($event)" @changePerPage="changePerPage($event)" />
      <!-- END: Pagination -->
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
