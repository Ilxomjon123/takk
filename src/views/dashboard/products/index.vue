<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Menus</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <a
          href="javascript:;"
          data-toggle="modal"
          data-target="#new-order-modal"
          class="btn btn-primary shadow-md mr-2"
        >New menu</a>
        <!-- <div class="pos-dropdown dropdown ml-auto sm:ml-0">
          <button
            class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
            aria-expanded="false"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <ChevronDownIcon class="w-4 h-4" />
            </span>
          </button>
          <div class="pos-dropdown__dropdown-menu dropdown-menu">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <a
                href
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate">INV-0206020 - {{ $f()[3].users[0].name }}</span>
              </a>
              <a
                href
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate">INV-0206022 - {{ $f()[4].users[0].name }}</span>
              </a>
              <a
                href
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <ActivityIcon class="w-4 h-4 mr-2" />
                <span class="truncate">INV-0206021 - {{ $f()[5].users[0].name }}</span>
              </a>
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Item List -->
      <div class="intro-y col-span-12 lg:col-span-8">
        <div class="lg:flex intro-y">
          <div class="relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control py-3 px-4 w-full lg:w-64 box pr-10 placeholder-theme-13"
              placeholder="Search item..."
            />
            <SearchIcon
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
          </div>
          <select
            class="form-select py-3 px-4 box w-full lg:w-auto mt-3 lg:mt-0 ml-auto"
          >
            <option>Sort By</option>
            <option>A to Z</option>
            <option>Z to A</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>
        <div class="grid grid-cols-12 gap-5 mt-5">
          <div
            v-for="item, itemIndex in foodMenus"
            class="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in"
          >
            <div class="font-medium text-base">{{ item.name }}</div>
            <div class="text-gray-600">{{ item.product_count }} products</div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5">
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
        </div>
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
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { fetchFoodMenuList } from '@/api/rest/foodMenus';

const foodMenus = reactive([]);
const products = reactive([]);
const selectedProduct = reactive({});
const store = useStore()

store.commit('setLoadingStatus', true)
fetchFoodMenuList().then(res => {
  Object.assign(foodMenus, res.results)
  store.commit('setLoadingStatus', false)
})
</script>

<style scoped lang="scss">
.active-menu {
  @apply bg-theme-1 dark:bg-theme-1;
}
</style>
