<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCafeList } from '@/api/admin';
import store from '@/store';
import CafeAdminItemCard from './CafeAdminItemCard.vue';

const router = useRouter();
const list = reactive([]);
const selectedCompanyId = computed(
  () => store.getters['adminCompany/getAdminSelectedCompanyID']
);

await fetchData();

async function fetchData() {
  const res = await fetchCafeList({
    limit: 100,
    company: selectedCompanyId.value || '',
  });
  Object.assign(list, res.results);
}

function gotoForm(id) {
  if (id) {
    router.push(`/admin/cafes/${id}`);
  } else {
    router.push(`/admin/cafes/add`);
  }
}
</script>

<template>
  <div>
    <div class="grid sm:grid-cols-10 mt-5 items-center">
      <div class="col-span-1">
        <h2 class="text-lg font-medium">Cafe List</h2>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary shadow-md w-36" @click="gotoForm(null)">
          Add Cafe
        </button>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <div
          v-if="list.length"
          class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          <CafeAdminItemCard
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
