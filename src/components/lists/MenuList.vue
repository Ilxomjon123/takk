<script setup>
import { computed, onMounted, ref } from 'vue';
import MenuAddEditFormModal from '../modals/MenuAddEditFormModal.vue';
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import cash from 'cash-dom';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';
import ConfirmDeletionModal from '../modals/ConfirmDeletionModal.vue';

const props = defineProps({
  subItemTitle: String,
  subItemValue: String
});
const emit = defineEmits(['update-id']);

const notyf = useNotyf();
const items = ref([]);
const dispatcher = ref('postMenu');
const addDispatcher = ref('postMenu');
const editDispatcher = ref('putMenu');
const selectedMenuDetails = ref({});
const selectedMenuID = ref(null);
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);

onMounted(async () => {
  await fetchData();
});

function paginate(val) {
  items.value = val;
}

function search() {
  selectMenu(null);
}

function setItems(val) {
  items.value = val;
}

function selectMenu(val) {
  store.commit('setSelectedMenuId', val);
  emit('update-id', val);
}

function addMenu() {
  selectedMenuDetails.value = {};
  dispatcher.value = addDispatcher.value;
  cash('#menu-add-edit-modal').modal('show');
}

function editMenu(val) {
  dispatcher.value = editDispatcher.value;
  selectedMenuDetails.value = val;
  cash('#menu-add-edit-modal').modal('show');
}

function onDelete(id) {
  selectedMenuID.value = id;
  cash('#confirm-deletion-modal').modal('show');
}

async function deleteMenu(val) {
  try {
    store.commit('setLoadingStatus', true);

    const res = await store.dispatch('deleteMenu', val);
    await fetchData();
    notyf.success('Menu item deleted successfully!');
  } catch (error) {
    notyf.error('Error while deleting menu: ' + error.message);
  } finally {
    store.commit('setLoadingStatus', false);
  }
}

async function fetchData() {
  store.commit('setLoadingStatus', true);
  const res = await store.dispatch('fetchMenus');
  items.value = res.results;
  store.commit('setLoadingStatus', false);
}

async function updateList() {
  await fetchData();
}
</script>

<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-5 gap-5">
      <h2 class="text-lg font-medium">Menus List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary" @click="addMenu">
          <span class="flex items-center justify-center">
            <PlusIcon class="h-4 w-4 mr-3" />
          </span>
          Add Menu
        </button>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <div
        class="col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2 box p-5 cursor-pointer zoom-in"
        v-for="(item, index) in items"
        :key="index"
        :class="
          item.id == activeMenuID ? 'bg-theme-1 dark:bg-theme-1 text-white' : ''
        "
      >
        <div class="flex col-span-12 w-full">
          <div
            class="mr-auto font-medium text-base"
            @click="selectMenu(item.id)"
          >
            {{ item.name }}
          </div>
          <!-- <MoreHorizontalIcon /> -->
          <div class="dropdown inline-block" data-placement="right-start">
            <button class="dropdown-toggle -mr-3" aria-expanded="false">
              <MoreVerticalIcon />
            </button>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <a
                  href="javascript:void(0);"
                  @click="editMenu(item)"
                  data-dismiss="dropdown"
                  class="flex cursor-pointer items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <span><Edit2Icon class="w-4 h-4 mr-2" /> Edit</span>
                </a>
                <a
                  href="javascript:void(0);"
                  @click="onDelete(item.id)"
                  data-dismiss="dropdown"
                  class="flex cursor-pointer items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <span><TrashIcon class="w-4 h-4 mr-2" /> Delete</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="mr-auto text-gray-600">
            {{ subItemTitle + ': ' + item[subItemValue] }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <MenuAddEditFormModal
    :dispatcher="dispatcher"
    :item="selectedMenuDetails"
    @submitted="updateList"
  />
  <ConfirmDeletionModal @confirm="deleteMenu" />
</template>
