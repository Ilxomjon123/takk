<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import router from '../../router';

const route = useRoute();
const query = router.currentRoute.value.query.id
  ? `?id=${router.currentRoute.value.query.id}`
  : '';
console.log({ route });
console.log({ router });
const store = useStore();
const company = computed(() => store.getters.getCompany);
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
            :class="company?.status ? 'text-theme-9' : 'text-theme-6'"
          >
            {{ company?.status ? 'Active' : 'Not Active' }}
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
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-link-exact-active {
  @apply text-theme-1 dark:text-theme-10 font-medium;
}
</style>
