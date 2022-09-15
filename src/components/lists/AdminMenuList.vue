<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import cash from 'cash-dom';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';
import MenuAddEditFormModal from '@/components/modals/MenuAddEditFormModal.vue';
import ConfirmDeletionModal from '@/components/modals/ConfirmDeletionModal.vue';
import CustomPagination from '@/components/paginator/CustomPagination.vue';

const props = defineProps({
  subItemTitle: String,
  subItemValue: String,
});

const emit = defineEmits(['update-id']);

const notyf = useNotyf();
const menusData = reactive({
  current_page_size: 10,
  limit: 100,
  links: {
    next: '',
    previous: '',
  },
  page: 1,
  total_objects: 51,
  total_pages: 6,
  results: [],
});
const dispatcher = ref('adminMenu/postMenu');
const addDispatcher = ref('adminMenu/postMenu');
const editDispatcher = ref('adminMenu/putMenu');
const selectedMenuDetails = ref({});
const selectedMenuID = ref(null);
const activeMenuId = computed(() => store.getters['getSelectedMenuId']);

await fetchData();

function search() {
  selectMenu(null);
}

function setItems(val) {
  menusData.results = val;
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

async function deleteMenu() {
  try {
    await store.dispatch('adminMenu/deleteMenu', selectedMenuID.value);
    await fetchData();
    notyf.success('Menu item removed successfully!');
  } catch (error) {
    notyf.error('Error while removing menu: ' + error.message);
  }
}

async function fetchData() {
  try {
    const res = await store.dispatch('adminMenu/fetchMenus', {
      page: menusData.page,
      limit: menusData.limit,
    });
    Object.assign(menusData, res);
  } catch (error) {
    notyf.error('Error while fetching data: ' + error.message);
  }
}

function updateList() {
  fetchData();
}

async function onPaginate(page) {
  menusData.page = page;
  await fetchData();
}

async function updateLimit(limit) {
  console.log({ limit });

  menusData.limit = limit;
  await fetchData();
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mt-5 items-center"
    >
      <div class="col-span-1">
        <h2 class="text-lg font-medium">Menus List</h2>
      </div>
      <button class="btn btn-primary w-full md:w-36" @click="addMenu">
        Add Menu
      </button>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <div
        class="col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2 box p-5"
        v-for="(item, index) in menusData.results"
        :key="index"
        :class="
          item.id == activeMenuId
            ? 'bg-theme-31 dark:bg-theme-31 text-white'
            : ''
        "
      >
        <div class="flex col-span-12 w-full">
          <div
            class="mr-auto font-medium text-base cursor-pointer"
            @click="selectMenu(item.id)"
          >
            {{ item.name }}
          </div>
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
