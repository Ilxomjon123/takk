<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCafeList } from '@/api';
import CafeItemCard from './CafeItemCard.vue';
import store from '../../../store';

const router = useRouter();
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
  store.commit('setLoadingStatus', true);

  if (id) {
    router.push(`/dashboard/cafes/${ id }`);
  } else {
    router.push(`/dashboard/cafes/add`);
  };

  store.commit('setLoadingStatus', false);
}
</script>

<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Data List Layout</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <button class="btn btn-primary shadow-md mr-2" @click="gotoForm(null)">Add New Cafe</button>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <CafeItemCard v-for="cafe, index in list" :cafe="cafe" @click="gotoForm(cafe.id)" class="cafe_item" />
        </div>
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
