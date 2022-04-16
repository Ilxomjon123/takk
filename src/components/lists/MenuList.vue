<script setup>
import { computed, defineComponent, onMounted, ref } from 'vue'
import MainPaginator from '../paginator/MainPaginator.vue'
import MenuAddEditFormModal from '../modals/MenuAddEditFormModal.vue'
import { useStore } from 'vuex'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue'
import cash from 'cash-dom'

const props = defineProps({
  subItemTitle: String,
  subItemValue: String
});
const emit = defineEmits(['update-id']);

const store = useStore()
const paginator = ref(null)
const paginationForm = ref(null)
const items = ref([])
const dispatcher = ref('postMenu')
const addModalId = ref(null)
const editModalId = ref(null)
const modalId = ref('menu-form-modal')
const addDispatcher = ref('postMenu')
const editDispatcher = ref('putMenu')
const successMessage = ref('Successfully Deleted!')
const loadingDelete = ref(null)
const selectedMenuDetails = ref({})

const getSelectedMenuId = computed(() => store.getters['getSelectedMenuId'])

onMounted(() => {
  fetchData()
})

function paginate(val) {
  items.value = val
}

function search() {
  selectMenu(null);
  // paginator.value.paginate(1)
}

function setItems(val) {
  items.value = val;
}

function selectMenu(val) {
  store.commit('setSelectedMenuId', val);
  emit('update-id', val);

}

function addMenu() {
  selectedMenuDetails.value = {}
  dispatcher.value = addDispatcher.value;
  cash('#menu-add-edit-modal').modal('show');
}

function editMenu(val) {
  dispatcher.value = editDispatcher.value;
  selectedMenuDetails.value = val
  cash('#menu-add-edit-modal').modal('show');
}

async function deleteMenu(val) {
  store.commit('setLoadingStatus', true);

  const res = await store.dispatch('deleteMenu', val);

  if (res.status === true) {
    successMessage.value = 'Successfully Deleted!'
    store.commit('setSuccessNotification', true);
    // search();
    updateList()
  } else store.commit('setSuccessNotification', true);

  store.commit('setLoadingStatus', false);
}

async function fetchData() {
  console.log(dispatcher.value);
  store.commit('setLoadingStatus', true);
  const res = await store.dispatch('fetchMenus');
  items.value = res.results;
  store.commit('setLoadingStatus', false);
}

function updateList() {
  fetchData()
}

</script>

<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium">Menus List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="ml-2 btn btn-primary" @click="addMenu">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span> Add Menu
        </button>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <div class="col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2 box p-5 cursor-pointer zoom-in"
        v-for="(item, index) in items" :key="index"
        :class="item.id == getSelectedMenuId ? 'bg-theme-1 dark:bg-theme-1 text-white' : ''"
        @click="selectMenu(item.id)">
        <div class="flex col-span-12 w-full">
          <div class="mr-auto font-medium text-base">{{ item.name }}</div>
          <!-- <MoreHorizontalIcon /> -->
          <div class="dropdown inline-block" data-placement="right-start">
            <button class="dropdown-toggle -mr-3" aria-expanded="false">
              <MoreVerticalIcon />
            </button>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <a @click="editMenu(item)" data-dismiss="dropdown"
                  class="flex cursor-pointer items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                  <Edit2Icon class="w-4 h-4 mr-2" />Edit
                </a>
                <a data-dismiss="dropdown"
                  class="flex cursor-pointer items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                  <DeleteConfirmModal @onConfirmedDelete="deleteMenu(item.id)" :isIcon="true" iconClass="w-4 h-4 mr-2"
                    :modalId="`menu-delete-modal-${item.id}`" />
                </a>

              </div>
            </div>
          </div>
          <!-- <div class="flex">
            <Edit2Icon @click="editMenu(item)" class="hover:text-theme-12" />
            <DeleteConfirmModal
              @onConfirmedDelete="deleteMenu(item.id)"
              :isIcon="true"
              :modalId="`menu-delete-modal-${ item.id }`"
            />
          </div> -->
          <!-- <TrashIcon @click="editMenu(item)" class="hover:text-theme-6" /> -->
        </div>
        <div class="flex">
          <div class="mr-auto text-gray-600">{{ subItemTitle + ": " + item[subItemValue] }}</div>
        </div>
      </div>
    </div>

    <!-- BEGIN: Pagination -->
    <!-- <MainPaginator
      class="mt-5"
      dispatcher="fetchMenus"
      ref="paginator"
      @setItems="setItems($event)"
      :form="paginationForm"
    />-->
    <!-- END: Pagination -->
  </div>

  <MenuAddEditFormModal :item="selectedMenuDetails" @submitted="updateList" />
</template>
