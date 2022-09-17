<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotyf } from '@/composables/useNotyf';
import { fetchProductsList, updateProductPositions } from '@/api';
import MenuList from '@/components/lists/MenuList.vue';
import Pagination from '@/components/paginator/Pagination.vue';
import SearchProduct from '@/components/forms/SearchProduct.vue';
import DraggableList from './DraggableList.vue';
import store from '@/store';

const router = useRouter();
const notyf = useNotyf();
const products = reactive({});
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);
const isReordered = ref(false);
const isLoading = ref(false);

const paginator = reactive({
  page: ref(1),
  limit: ref(10),
  total: ref(0),
});

onMounted(async () => {
  if (activeMenuID.value) {
    await fetchProducts();
  }
});

async function fetchProducts() {
  isLoading.value = true;

  try {
    const res = await fetchProductsList({
      menuId: activeMenuID.value,
      page: paginator.page,
      limit: paginator.limit,
      search: '',
    });

    if (res) {
      Object.assign(products, res);
      paginator.total = res.total_objects;
    }
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function paginate(val) {
  paginator.page = val;
  await fetchProducts();
}

async function changePerPage(val) {
  paginator.limit = val;
  paginator.page = 1;
  await fetchProducts();
}

function gotoAddPage() {
  router.push('/dashboard/products/add');
}

async function saveReorderedList() {
  isLoading.value = true;

  try {
    const res = await updateProductPositions({
      obj_type: 'product',
      obj_list: products.results.map((item, itemIndex) => ({
        id: item.id,
        position: itemIndex + 1 + (paginator.page - 1) * paginator.limit,
      })),
    });

    if (res) {
      isReordered.value = false;
      fetchProducts();
    }
    notyf.success();
  } catch (error) {
    notyf.error();
  } finally {
    isLoading.value = false;
  }
}

async function handleSearchEvent(value) {
  isLoading.value = true;
  try {
    if (value.length === 0 || value.length > 2) {
      const res = await fetchProductsList({
        menuId: activeMenuID.value,
        page: paginator.page,
        limit: paginator.limit,
        search: value,
      });

      if (res) {
        Object.assign(products, res);
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
    const res = await fetchProductsList({
      menuId: activeMenuID.value,
      page: paginator.page,
      limit: paginator.limit,
      search: value,
    });

    if (res) {
      Object.assign(products, res);
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
    <!-- Menu List start -->
    <MenuList
      @update-id="fetchProducts"
      sub-item-title="Products"
      sub-item-value="product_count"
    />
    <!-- Menu List end -->
    <div
      class="grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-0 mt-10 items-center"
    >
      <div class="col-span-1">
        <h2 class="text-lg font-medium">Products List</h2>
      </div>
      <button
        class="col-auto btn btn-primary w-36 whitespace-nowrap"
        @click="gotoAddPage"
        :disabled="!activeMenuID"
      >
        Add Product
      </button>
      <SearchProduct
        class="md:col-start-4 lg:col-start-6 xl:col-start-8"
        :loading="isLoading"
        :is-disabled="!activeMenuID"
        @searching="handleSearchEvent"
        @search:manual="handleSearchSubmit"
      />
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
          <DraggableList
            :list="products.results"
            @reorder:list="saveReorderedList"
            @update:list="fetchProducts"
          />
          <!-- <DraggableList :list="products.results" @update:list="isReordered = true" /> -->
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
</template>

<style scoped lang="scss"></style>
