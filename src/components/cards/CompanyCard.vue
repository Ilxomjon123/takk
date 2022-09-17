<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
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
            :class="company?.is_activate ? 'text-theme-9' : 'text-theme-6'"
          >
            {{ company?.is_activate ? 'Active' : 'Not Active' }}
          </div>
        </div>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <RouterLink
          to="/dashboard/company"
          class="flex items-center"
          :class="{
            'text-theme-1 dark:text-theme-10 font-medium':
              route.path == '/dashboard/company',
          }"
        >
          <SettingsIcon class="w-4 h-4 mr-2" /> Company Information
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :class="{
            'text-theme-1 dark:text-theme-10 font-medium':
              route.path == '/dashboard/company/square',
          }"
          to="/dashboard/company/square"
        >
          <svg
            class="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
            :style="
              route.path == '/dashboard/company/square'
                ? 'fill:#1C3FAA'
                : store.getters.darkMode
                ? 'fill:#3160D8'
                : ''
            "
          >
            <path
              d="M33.537,6H14.463C9.789,6,6,9.789,6,14.463v19.074C6,38.211,9.789,42,14.463,42h19.074 C38.211,42,42,38.211,42,33.537V14.463C42,9.789,38.211,6,33.537,6z M35,31.992C35,33.654,33.654,35,31.992,35H16.008 C14.346,35,13,33.654,13,31.992V16.008C13,14.346,14.346,13,16.008,13h15.985C33.654,13,35,14.346,35,16.008V31.992z"
            ></path>
            <path d="M19 19H29V29H19z"></path>
          </svg>
          <!-- <BoxIcon class="w-4 h-4 mr-2" />  -->
          Square
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :class="{
            'text-theme-1 dark:text-theme-10 font-medium':
              route.path == '/dashboard/company/banking',
          }"
          to="/dashboard/company/banking"
        >
          <CreditCardIcon class="w-4 h-4 mr-2" /> Banking Information
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :class="{
            'text-theme-1 dark:text-theme-10 font-medium':
              route.path == '/dashboard/company/tariffs',
          }"
          to="/dashboard/company/tariffs"
        >
          <ActivityIcon class="w-4 h-4 mr-2" /> Tariffs
        </RouterLink>
        <RouterLink
          class="flex items-center mt-5"
          :class="{
            'text-theme-1 dark:text-theme-10 font-medium':
              route.path == '/dashboard/company/app-images',
          }"
          to="/dashboard/company/app-images"
        >
          <ImageIcon class="w-4 h-4 mr-2" /> App background images
        </RouterLink>
      </div>
    </div>
  </div>
</template>
