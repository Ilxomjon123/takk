<script setup>
import { computed, ref } from 'vue';
import { isNull } from 'lodash';
import Draggable from 'vuedraggable';
import cash from 'cash-dom';

import store from '@/store';
import router from '@/router';
import MenuSelect from '@/components/selects/MenuSelect.vue';
import {
  duplicateProduct,
  deleteProduct,
  fetchSelectedMenuCategories,
  isProductAvailable,
} from '@/api/admin';

const props = defineProps({
  list: Array,
});

const emit = defineEmits(['update:list', 'reorder:list']);
const selectedProductId = ref(null);
const selectedMenuCategories = ref([]);
const isLoading = ref(false);

async function handleSelectedMenuCategories(menu_id) {
  selectedMenuCategories.value = [];
  isLoading.value = true;
  if (!isNull(menu_id)) {
    const res = await fetchSelectedMenuCategories(menu_id, 100);
    selectedMenuCategories.value = res.results;
  }
  isLoading.value = false;
}
async function reorderList(event) {
  emit('reorder:list');
}

function handleSwitcher(event, product_id) {
  isProductAvailable({
    product: product_id,
    is_available: event.target.checked,
  });
}

function openDuplicateModal(product_id) {
  selectedProductId.value = product_id;
  cash('#duplicate-modal').modal('show');
}

function openDeleteModal(product_id) {
  selectedProductId.value = product_id;
  cash('#delete-confirmation-modal').modal('show');
}

async function deleteObj() {
  cash('#delete-confirmation-modal').modal('hide');
  await deleteProduct(selectedProductId.value);
  // await fetchProducts()
  emit('update:list');
}

async function handleProductDuplicate(category) {
  try {
    isLoading.value = true;
    const data = {
      product: selectedProductId.value,
      category,
    };

    const res = await duplicateProduct(data);
    cash('#duplicate-modal').modal('hide');
    router.push('/admin/products/' + res.id);
  } catch (error) {
    console.log('Error while duplicating product: ', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Draggable
    tag="tbody"
    :list="list"
    group="list"
    item-key="id"
    @change="reorderList"
    :animation="300"
  >
    <template #item="{ element }">
      <tr class="intro-x">
        <!-- <td>
          <div class="form-check">
            <input :id="'selected_product_' + element.id" class="form-check" type="checkbox"
              @change="(e) => handleSelectProducts(e, element.id)" />
          </div>
        </td> -->
        <td>
          <div class="form-check">
            <input
              :id="'product_available' + element.id"
              class="form-check-switch"
              type="checkbox"
              @change="(e) => handleSwitcher(e, element.id)"
              :checked="element.available"
            />
          </div>
        </td>
        <td scope="row">
          <div class="w-20 h-20 image-fit zoom-in">
            <img alt="image" class="rounded-full" :src="element.image" />
          </div>
        </td>
        <td>
          <p class="font-medium whitespace-nowrap">{{ element.name }}</p>
          <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">
            {{ element.category?.name }}
          </div>
        </td>
        <td class="text-center">{{ element.position }}</td>
        <td class v-html="element.description"></td>
        <td class="table-report__action">
          <div class="dropdown inline-block" data-placement="right-start">
            <button class="dropdown-toggle -mr-3" aria-expanded="false">
              <MoreVerticalIcon />
            </button>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <button
                  @click="$router.push('/admin/products/' + element.id)"
                  class="flex w-full items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <Edit2Icon class="w-4 h-4 mr-2" />Edit
                </button>
                <button
                  @click="openDuplicateModal(element.id)"
                  class="flex w-full items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <CopyIcon class="w-4 h-4 mr-2" />Duplicate
                </button>
                <button
                  @click="openDeleteModal(element.id)"
                  class="flex w-full items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <Trash2Icon class="w-4 h-4 mr-2" />Delete
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </Draggable>

  <!-- BEGIN: Duplicate Modal -->
  <div id="duplicate-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- BEGIN: Modal Body -->
        <div class="modal-body">
          <MenuSelect
            class="mt-2"
            @update:model-value="handleSelectedMenuCategories"
          />
          <div
            class="border-t border-theme-3 dark:border-dark-5 mt-5 text-white relative"
          >
            <div
              v-show="isLoading"
              style="background-color: rgba(100, 100, 100, 0.1)"
              class="absolute w-full h-full z-50 flex flex-col justify-center items-center"
            >
              <LoadingIcon
                icon="tail-spin"
                class="mr-3 w-16 h-16"
                color="#fff"
              />
            </div>
            <button
              class="flex w-full items-center px-3 py-3 rounded-md hover:bg-gray-500"
              v-for="cat in selectedMenuCategories"
              type="button"
              @click="handleProductDuplicate(cat.id)"
            >
              <img class="rounded-full" :src="cat.image_small" alt="cat img" />
              <span class="ml-5">{{ cat.name }}</span>
            </button>
          </div>
        </div>
        <!-- END: Modal Body -->
        <!-- BEGIN: Modal Footer -->
        <!-- <div class="modal-footer text-right flex gap-3">
          <button type="button" data-dismiss="modal" class="btn btn-outline-secondary ml-auto">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" :disabled="isLoading">
            <LoadingIcon v-show="isLoading" icon="tail-spin" class="mr-3" color="#fff" />
            <span>Duplicate</span>
          </button>
        </div> -->
        <!-- END: Modal Footer -->
      </div>
    </div>
  </div>
  <!-- END: Duplicate Modal -->

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
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger w-24"
              @click="deleteObj"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Delete Confirmation Modal -->
</template>

<style scoped lang="scss">
#duplicate-modal .modal-body {
  min-height: 10rem;
}
</style>
