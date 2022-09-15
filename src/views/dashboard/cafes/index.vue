<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCafeList } from '@/api';
import CafeItemCard from './CafeItemCard.vue';
import store from '@/store';

const router = useRouter();
// const rowId = ref(null)
// const isLoading = ref(true)
const list = reactive([]);

onMounted(async () => {
  const res = await fetchCafeList();
  Object.assign(list, res.results);
});

function gotoForm(id) {
  if (id) {
    router.push(`/dashboard/cafes/${id}`);
  } else {
    router.push(`/dashboard/cafes/add`);
  }
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mt-5 items-center"
    >
      <div class="col-span-1">
        <h2 class="text-lg font-medium">Cafe List</h2>
      </div>
      <button class="btn btn-primary shadow-md w-36" @click="gotoForm(null)">
        Add Cafe
      </button>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <div
          v-if="list.length"
          class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          <CafeItemCard
            v-for="(cafe, index) in list"
            :key="index"
            :cafe="cafe"
            @click="gotoForm(cafe.id)"
            class="cafe_item"
          />
        </div>
        <div
          v-else
          class="hidden md:block mx-auto text-gray-600 text-center col-span-12"
        >
          No Data
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
