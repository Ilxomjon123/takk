<script setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import router from '@/router';
import useCompany from '@/features/useCompany';
import { fetchCompanyById } from '@/api/admin';
import ConfirmModal from '../modals/ConfirmModal.vue';
import cash from 'cash-dom';
import { updateCompanyById } from '../../api/admin';

// const props = defineProps({
//   company: {
//     type: Object,
//     default: () => {}
//   }
// });

const { getSelected, setSelected } = useCompany();
const company = computed(() => getSelected.value);
const queryID = router.currentRoute.value?.query?.id ?? null;
const query = router.currentRoute.value.query.id
  ? `?id=${router.currentRoute.value.query.id}`
  : '';

const store = useStore();
// const company = computed(() => store.getters.getCompany);

watch(
  () => company.value,
  async newVal => {
    console.log('newVal: ', newVal);
    if (!newVal && queryID) {
      const res = await fetchCompanyById(queryID);
      setSelected(res);
      console.log('newVal in IF statement: ', company.value);
    }
  },
  { deep: true, immediate: true }
);

async function toggleStatus() {
  console.log('ok');
  const res = await updateCompanyById(company.value.id, {
    name: company.value.name,
    is_activate: !company.value.is_activate
  });
  setSelected(res);
}

function showConfirmModal() {
  cash('#confirm-modal').modal('show');
}
</script>

<template>
  <div
    class="col-span-12 lg:col-span-3 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <div class="intro-y box mt-5 lg:mt-0">
      <div class="relative flex items-center p-5">
        <div class="mr-auto">
          <div class="font-medium text-base">
            {{ company?.name }}
          </div>
        </div>
        <div>
          <div
            class="font-medium text-base"
            :class="company?.is_activate ? 'text-theme-9' : 'text-theme-6'"
          >
            {{ company?.is_activate ? 'Active' : 'Not Active' }}
          </div>
        </div>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <RouterLink
          :to="`/admin/company/form${query}`"
          class="flex items-center"
        >
          <SettingsIcon class="w-4 h-4 mr-2" /> Company Information
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :to="`/admin/company/form/square${query}`"
        >
          <BoxIcon class="w-4 h-4 mr-2" /> Square
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :to="`/admin/company/form/banking${query}`"
        >
          <CreditCardIcon class="w-4 h-4 mr-2" /> Banking Information
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :to="`/admin/company/form/tariffs${query}`"
        >
          <ActivityIcon class="w-4 h-4 mr-2" /> Tariffs
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :to="`/admin/company/form/app-images${query}`"
        >
          <ImageIcon class="w-4 h-4 mr-2" /> Mobile App Images
        </RouterLink>
        <a
          class="flex items-center mt-5"
          href="javascript:;"
          :class="company?.is_activate ? 'text-theme-6' : 'text-theme-9'"
          @click="showConfirmModal"
        >
          <ImageIcon class="w-4 h-4 mr-2" />
          {{ company?.is_activate ? 'Inactivate' : 'Activate' }}
        </a>
      </div>
    </div>
    <ConfirmModal @confirm="toggleStatus()" />
  </div>
</template>

<style scoped lang="scss">
.router-link-exact-active {
  @apply text-theme-1 dark:text-theme-10 font-medium;
}
</style>
