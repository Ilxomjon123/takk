<template>
  <header class="w-full">
    <div class="container py-5 flex flex-wrap justify-between">
      <div class="flex lg:mr-5 px-1 py-2">
        <a href="/">
          <img
            class="w-1/2 md:w-auto"
            src="@/assets/images/Takk_Logo.png"
            alt="takk logo"
          />
        </a>
      </div>
      <div class="hidden w-full md:flex lg:w-auto justify-between">
        <ul
          v-if="$route.path === '/'"
          ref="menu"
          class="flex flex-wrap p-1 md:p-2 text-xl text-theme-32 font-medium content-center"
        >
          <li class="mx-1 px-1 py-2">
            <a
              class="whitespace-no-wrap"
              href="#preordering-rectangle"
            >Preordering</a>
          </li>
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#delivery-rectangle">Delivery</a>
          </li>
          <li class="mx-1 px-1 py-2">
            <a
              class="whitespace-no-wrap"
              href="#loyalty-stamps-rectangle"
            >Loyalty Stamps</a>
          </li>
          <li class="mx-1 px-1 py-2">
            <a
              class="whitespace-no-wrap"
              href="#self-checkout-rectangle"
            >Self Checkout System</a>
          </li>
          <li class="mx-1 px-1 py-2">
            <a class="whitespace-no-wrap" href="#analytics-rectangle">Analytics</a>
          </li>
          <li class="mx-1 px-1 py-2">
            <a href="/login" class="text-theme-31 font-bold">
              <span>Sign In</span>
            </a>
          </li>
        </ul>
        <h1 v-else class="text-xl font-bold text-gray-600 my-auto p-4">
          Takk app is available on
          <span class="text-theme-31">
            <router-link to="/">App Store</router-link>
          </span> and
          <span class="text-theme-31">
            <router-link to="/">Google Play</router-link>
          </span>.
        </h1>
      </div>
      <div class="hidden md:flex w-full lg:w-auto">
        <ul
          class="flex flex-wrap p-1 md:p-2 text-sm md:text-base font-medium content-center"
        >
          <li class="mx-1 px-1 py-2">
            <router-link
              v-if="$route.path == '/'"
              to="/for-customers"
              class="px-6 py-2 border-2 border-theme-31 bg-theme-31 text-white rounded-full font-bold hover:bg-theme-2 hover:text-black shadow-lg"
            >
              <span>For Customers</span>
            </router-link>
            <router-link
              v-if="$route.path == '/for-customers'"
              to="/"
              class="px-6 py-2 border-2 border-theme-31 bg-theme-31 text-white rounded-full font-bold hover:bg-theme-2 hover:text-black shadow-lg"
            >
              <span>For Coffee Shops</span>
            </router-link>
          </li>
          <li class="mx-1 px-1 py-2">
            <router-link
              to="/"
              class="px-6 py-2 border-2 border-theme-31 rounded-full font-bold text-gray-600 hover:bg-theme-31 hover:text-white shadow-lg"
            >
              <span>Contact us</span>
            </router-link>
          </li>
        </ul>
      </div>
      <button
        v-if="$route.path === '/'"
        class="ml-auto md:hidden"
        ref="burger"
        @click="openMobileMenu"
      >
        <img src="@/assets/images/Icon_feather-menu.svg" alt="Menu Icon" />
      </button>
    </div>
  </header>
</template>

<script setup>
import cash from 'cash-dom';
import { ref } from 'vue'

function openMobileMenu() {
  cash("#mobile-over-menu").modal("show");
}
</script>

