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
        </div>-->
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
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { fetchCafeList } from '@/api';
import CafeItemCard from './CafeItemCard.vue';

const router = useRouter();
const store = useStore();
// const rowId = ref(null)
// const isLoading = ref(true)
const list = reactive([])

onMounted(async () => {
  store.commit('setLoadingStatus', true)
  const res = await fetchCafeList()
  Object.assign(list, res.results)
  store.commit('setLoadingStatus', false)

});
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
</script>

<style scoped lang="scss">
.cafe_item:hover {
  cursor: pointer;
  img {
    @apply bg-primary-1;
  }
}
</style>
