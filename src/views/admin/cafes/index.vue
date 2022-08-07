<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCafeList } from '@/api/adham';
import store from '@/store';
import CafeAdminItemCard from './CafeAdminItemCard.vue';

const router = useRouter();
// const rowId = ref(null)
// const isLoading = ref(true)
const list = reactive([])

onMounted(async () => {
  store.commit('setLoadingStatus', true)
  const res = await fetchCafeList(100)
  Object.assign(list, res.results)
  store.commit('setLoadingStatus', false)

});

function gotoForm(id) {
  store.commit('setLoadingStatus', true);

  if (id) {
    router.push(`/admin/cafes/${ id }`);
  } else {
    router.push(`/admin/cafes/add`);
  };

  store.commit('setLoadingStatus', false);
}
</script>

<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium">Cafe List</h2>
      <div class="w-full sm:w-auto flex ml-2 sm:mt-0">
        <div class="intro-y flex flex-wrap sm:flex-nowrap items-center">
          <button class="btn btn-primary shadow-md" @click="gotoForm(null)">
            <PlusIcon class="h-4 w-4 mr-3" />
            Add New Cafe
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <div v-if="list.length" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <CafeAdminItemCard v-for="(cafe, index) in list" :key="index" :cafe="cafe" @click="gotoForm(cafe.id)"
            class="cafe_item" />
        </div>
        <div v-else class="hidden md:block mx-auto text-gray-600 text-center col-span-12">No Data</div>
      </div>
      <!-- END: Data List -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.cafe_item:hover {
  cursor: pointer;

  img {
    @apply bg-primary-1;
  }
}
</style>
