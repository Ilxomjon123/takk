<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCompanyList } from '@/api/admin';
import store from '@/store';
import CompanyCard from './CompanyCard.vue';

const router = useRouter();
const list = ref([]);

await fetchData();

async function fetchData() {
  const res = await fetchCompanyList(100);
  list.value = res.results;
}

function gotoEditForm(company) {
  router.push(`/admin/company/form?id=${company.id}`);
}

function gotoAddForm() {
  router.push(`/admin/company/form`);
}
</script>

<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium">Company List</h2>
      <!-- <div class="w-full sm:w-auto flex ml-2 sm:mt-0">
        <div class="intro-y flex flex-wrap sm:flex-nowrap items-center">
          <button class="btn btn-primary shadow-md" @click="gotoAddForm()">
            <PlusIcon class="h-4 w-4 mr-3" />
            Add New Company
          </button>
        </div>
      </div> -->
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <CompanyCard
            v-for="(company, index) in list"
            :key="index"
            :company="company"
            @click="gotoEditForm(company)"
            class="cafe_item"
          />
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
