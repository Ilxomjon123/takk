<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Data List Layout</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <button
          class="btn btn-primary shadow-md mr-2"
          @click="gotoForm(null)"
        >Add New Cafe</button>
        <div class="dropdown">
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
                href
                class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <PrinterIcon class="w-4 h-4 mr-2" />Print
              </a>
              <a
                href
                class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileTextIcon class="w-4 h-4 mr-2" />Export to Excel
              </a>
              <a
                href
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileTextIcon class="w-4 h-4 mr-2" />Export to PDF
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <CafeItemCard
            v-for="cafe, index in list"
            :cafe="cafe"
            @click="$router.push(`/dashboard/cafe-edit-form/${cafe.id}`)"
            class="cafe_item"
          />
        </div>
      </div>
      <!-- END: Data List -->
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
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import cash from 'cash-dom';
import { deleteCafe, fetchCafeList } from '../../api';
import CafeItemCard from './CafeItemCard.vue';

const router = useRouter();
const store = useStore();
const rowId = ref(null)
// const isLoading = ref(true)
const list = ref([])

store.commit('setLoadingStatus', true)
fetchCafeList().then(res => {
  list.value = res
  store.commit('setLoadingStatus', false)
  // isLoading.value = false
})

function gotoForm(id) {
  store.commit('setLoadingStatus', true)
  if (id) {
    router.push(`/dashboard/cafe-edit-form/${id}`);
    store.commit('setLoadingStatus', false)
  } else {
    router.push(`/dashboard/cafe-add-form`)
    store.commit('setLoadingStatus', false)
  };
}

function openConfirmModal(id) {
  cash('#delete-confirmation-modal').modal('show')
  console.log('deleted: ', id);
  rowId.value = id
}

function deleteObj() {
  store.commit('setLoadingStatus', true)
  cash('#delete-confirmation-modal').modal('hide')
  deleteCafe(rowId.value).then(res => {
    fetchCafeList().then(res => {
      list.value = res
      store.commit('setLoadingStatus', false)
    })
    // store.commit('setLoadingStatus', false)
  })
}
</script>

<style scoped lang="scss">
.cafe_item:hover {
  cursor: pointer;
  img {
    @apply bg-primary-1;
  }
}
</style>
