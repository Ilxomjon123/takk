<script setup>
import cash from 'cash-dom';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();
const isLoggedIn = store.getters['isLoggedIn'];
const isSuperuser = computed(() => store.getters['isSuperuser']);
const appleStore = 'https://apps.apple.com/us/app/kaffe-landskap/id1469010325';
const playStore = 'https://play.google.com/store/apps/details?id=com.takk.cafe';

isLoggedIn && store.dispatch('fetchProfile');

function openMobileMenu() {
  cash('#mobile-over-menu').modal('show');
}

const showContactUsModal = () => {
  cash('#contact-us-modal').modal('show');
};
const cabinetLink = computed(() => {
  if (isLoggedIn) {
    if (isSuperuser.value) {
      return '/admin';
    }
    return '/dashboard';
  }
  return '/login';
});
const goto = url => {
  router.push(url);
};
</script>

<template>
  <header class="w-full">
    <div class="container py-5 px-5 flex flex-wrap justify-between">
      <div class="flex lg:mr-auto py-2">
        <a href="/">
          <img
            class="w-1/2 md:w-auto"
            src="@/assets/images/Takk_Logo.png"
            alt="takk logo"
          />
        </a>
      </div>
      <div class="hidden w-full lg:flex lg:w-auto justify-between">
        <ul
          v-if="$route.path === '/'"
          ref="menu"
          class="flex flex-wrap p-1 md:p-2 text-base xl:text-2xl text-theme-32 font-medium content-center"
        >
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#preordering-rectangle"
              >Preordering</a
            >
          </li>
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#delivery-rectangle"
              >Delivery</a
            >
          </li>
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#loyalty-stamps-rectangle"
              >Loyalty Stamps</a
            >
          </li>
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#self-checkout-rectangle"
              >Self Checkout System</a
            >
          </li>
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#analytics-rectangle"
              >Analytics</a
            >
          </li>
          <li class="mx-1 px-1 py-2">
            <a :href="cabinetLink" class="text-theme-31 font-bold">
              <span>{{
                !cabinetLink.includes('login') ? 'Dashboard' : 'Sign In'
              }}</span>
            </a>
          </li>
        </ul>
        <h1
          v-else
          class="text-base xl:text-2xl font-bold text-gray-600 my-auto p-4"
        >
          Takk app is available on
          <span class="text-theme-31">
            <a :href="appleStore">App Store</a>
          </span>
          and
          <span class="text-theme-31">
            <a :href="playStore">Google Play</a> </span
          >.
        </h1>
      </div>
      <div class="hidden lg:flex w-full lg:w-auto">
        <ul
          class="flex flex-wrap text-sm xl:text-2xl md:text-base font-medium items-center gap-5"
        >
          <li class="py-2">
            <button
              v-if="$route.path == '/'"
              @click="goto('/for-customers')"
              class="rounded_btn_1"
            >
              <span>For Customers</span>
            </button>
            <button
              v-if="$route.path == '/for-customers'"
              @click="goto('/')"
              class="rounded_btn_1"
            >
              <span>For Coffee Shops</span>
            </button>
          </li>
          <li class="py-2">
            <button class="rounded_btn_1" @click="showContactUsModal">
              <span>Contact us</span>
            </button>
          </li>
        </ul>
      </div>
      <button
        v-if="$route.path === '/'"
        class="ml-auto lg:hidden"
        ref="burger"
        @click="openMobileMenu"
      >
        <img src="@/assets/images/Icon_feather-menu.svg" alt="Menu Icon" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.rounded_btn_1 {
  @apply xl:px-6 px-3 py-2 border-2 border-theme-31 rounded-full font-bold text-gray-600 hover:bg-theme-31 hover:text-white shadow-lg;
}

header .container {
  @media (min-width: 1537px) {
    max-width: 85%;
  }
  @media (max-width: 1536px) {
    // min-width: 100%;
    transform: scale(0.8);
    max-width: 125%;
    width: 125%;
    transform-origin: center left;
  }
}
</style>
