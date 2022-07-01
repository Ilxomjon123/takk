<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const store = useStore();
const company = computed(() => store.getters.getCompany)
// console.log(route.path);

</script>
<template>
  <div class="col-span-12 lg:col-span-3 2xl:col-span-3 flex lg:block flex-col-reverse">
    <div class="intro-y box mt-5 lg:mt-0">
      <div class="relative flex items-center p-5">
        <div class="mr-auto">
          <div class="font-medium text-base">
            {{ company?.name }}
          </div>
        </div>
        <div>
          <div class="font-medium text-base" :class="company?.status ? 'text-theme-9' : 'text-theme-6'">
            {{ company?.status ? 'Active' : 'Not Active' }}
          </div>
        </div>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <router-link to="/dashboard/company" class="flex items-center"
          :class="{ 'text-theme-1 dark:text-theme-10 font-medium': route.path == '/dashboard/company' }">
          <SettingsIcon class="w-4 h-4 mr-2" /> Company Information
        </router-link>
        <router-link class="flex items-center mt-5"
          :class="{ 'text-theme-1 dark:text-theme-10 font-medium': route.path == '/dashboard/company/square' }"
          to="/dashboard/company/square">
          <BoxIcon class="w-4 h-4 mr-2" /> Square
        </router-link>
        <router-link class="flex items-center mt-5"
          :class="{ 'text-theme-1 dark:text-theme-10 font-medium': route.path == '/dashboard/company/banking' }"
          to="/dashboard/company/banking">
          <CreditCardIcon class="w-4 h-4 mr-2" /> Banking Information
        </router-link>
        <router-link class="flex items-center mt-5"
          :class="{ 'text-theme-1 dark:text-theme-10 font-medium': route.path == '/dashboard/company/tariffs' }"
          to="/dashboard/company/tariffs">
          <ActivityIcon class="w-4 h-4 mr-2" /> Tariffs
        </router-link>
        <router-link class="flex items-center mt-5"
          :class="{ 'text-theme-1 dark:text-theme-10 font-medium': route.path == '/dashboard/company/app-images' }"
          to="/dashboard/company/app-images">
          <ImageIcon class="w-4 h-4 mr-2" /> Mobile App Images
        </router-link>
      </div>
    </div>
  </div>
</template>
