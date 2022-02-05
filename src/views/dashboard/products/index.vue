<template>
  <div>
    <!-- Menu List start -->
    <MenuList />
    <!-- Menu List end -->
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <h2 class="intro-y text-lg font-medium mt-10">Products List</h2>

      <div class="grid grid-cols-12 gap-6 mt-5">
        <div
          class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
        >
          <RouterLink to="/dashboard/products/add" class="btn btn-primary mr-3">
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" />
            </span>
            Add Category
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
      </div>
      <!-- BEGIN: Item List -->
      <div class="intro-y col-span-12 lg:col-span-8">
        <div class="intro-y col-span-12 overflow-auto">
          <table class="table table-report -mt-2 text-center">
            <thead>
              <tr>
                <th class="whitespace-nowrap"></th>
                <th class="whitespace-nowrap">Rank</th>
                <th class="whitespace-nowrap">ID</th>
                <th class="whitespace-nowrap">LOGO</th>
                <th class="whitespace-nowrap">NAME</th>
                <th class="whitespace-nowrap">PARENT</th>
                <th class="whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <Suspense>
                <template #default>
                  <tr v-for="(item, index) in products.results" :key="index">
                    <td v-text="(index + 1)" />
                    <td v-text="item.id" />
                  </tr>
                </template>
                <template #fallback></template>
              </Suspense>
            </tbody>
          </table>
        </div>
        <!-- <div class="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5">
          <a
            v-for="(product, productIndex) in products"
            :key="productIndex"
            href="javascript:;"
            data-toggle="modal"
            data-target="#add-item-modal"
            class="intro-y block col-span-12 sm:col-span-4 2xl:col-span-3"
          >
            <div class="box rounded-md p-3 relative zoom-in">
              <div class="flex-none pos-image relative block">
                <div class="pos-image__preview image-fit">
                  <img
                    alt="Icewall Tailwind HTML Admin Template"
                    :src="product.image"
                  />
                </div>
              </div>
              <div
                class="block font-medium text-center truncate mt-3"
              >{{ product.name }}</div>
            </div>
          </a>
        </div>-->
      </div>
      <!-- END: Item List -->
    </div>
    <!-- BEGIN: New menu Modal -->
    <div id="new-order-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">New menu</h2>
          </div>
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <label for="pos-form-1" class="form-label">Name</label>
              <input
                id="pos-form-1"
                type="text"
                class="form-control flex-1"
                placeholder="Customer name"
              />
            </div>
            <div class="col-span-12">
              <label for="pos-form-2" class="form-label">Table</label>
              <input
                id="pos-form-2"
                type="text"
                class="form-control flex-1"
                placeholder="Customer table"
              />
            </div>
            <div class="col-span-12">
              <label for="pos-form-3" class="form-label">Number of People</label>
              <input
                id="pos-form-3"
                type="text"
                class="form-control flex-1"
                placeholder="People"
              />
            </div>
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-32 mr-1"
            >Cancel</button>
            <button type="button" class="btn btn-primary w-32">Create Ticket</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: New menu Modal -->
    <!-- BEGIN: Add Item Modal -->
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
                  placeholder="Item quantity"
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
                placeholder="Item notes"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 mr-1"
            >Cancel</button>
            <button type="button" class="btn btn-primary w-24">Add Item</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Add Item Modal -->
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import MenuList from '@/components/lists/MenuList.vue'
import { fetchProductsList } from '@/api';

// const products = reactive({});
const selectedProduct = reactive({});
const store = useStore()
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);
// fetchProductsList(activeMenuID.value).then(res => Object.assign(products, res));
// computed(() => fetchProductsList(activeMenuID.value).then(res => Object.assign(products, res)))
const response = computed(() => fetchProductsList(activeMenuID.value).then(res => res))
const products = computed(() => response.value)

// const response = computed({
//   get: () => fetchProductsList(activeMenuID.value),
//   set: val => {
//     Object.assign(products, val)
//   }
// })

</script>

<style scoped lang="scss">
.active-menu {
  @apply bg-theme-1 dark:bg-theme-1;
}
</style>
