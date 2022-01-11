<template>
  <header class="w-full">
    <div class="container py-10">
      <nav class="grid grid-flow-col items-center whitespace-nowrap">
        <div class>
          <img
            class="object-cover"
            src="/src/assets/images/Takk Logo.png"
            alt="takk logo"
          />
        </div>
        <ul
          v-if="$route.path === '/'"
          ref="menu"
          class="md:grid grid-flow-col items-center md:gap-7 text-xl text-theme-32 font-medium ml-auto"
          :class="{ hidden: !isOpen }"
        >
          <li>
            <a href="#preordering-rectangle">Preordering</a>
          </li>
          <li>
            <a href="#delivery-rectangle">Delivery</a>
          </li>
          <li>
            <a href="#loyalty-stamps-rectangle">Loyalty Stamps</a>
          </li>
          <li>
            <a href="#self-checkout-rectangle">Self Checkout System</a>
          </li>
          <li>
            <a href="#analytics-rectangle">Analytics</a>
          </li>
          <li>
            <router-link to="/login" class="px-7 py-3 text-theme-31 font-bold">
              <span>Sign In</span>
            </router-link>
          </li>
        </ul>
        <h1 v-else class="text-xl font-bold text-gray-600">
          Takk app is available on
          <span class="text-theme-31">
            <router-link to="/">App Store</router-link>
          </span> and
          <span class="text-theme-31">
            <router-link to="/">Google Play</router-link>
          </span>.
        </h1>
        <ul
          class="md:grid grid-flow-col items-center md:gap-7 text-xl font-medium ml-auto"
        >
          <li>
            <router-link
              v-if="$route.path == '/'"
              to="/for-customers"
              class="px-10 py-3 bg-theme-31 text-white rounded-full font-bold hover:bg-theme-2 hover:text-black shadow-lg"
            >
              <span>For Customers</span>
            </router-link>
            <router-link
              v-if="$route.path == '/for-customers'"
              to="/"
              class="px-10 py-3 bg-theme-31 text-white rounded-full font-bold hover:bg-theme-2 hover:text-black shadow-lg"
            >
              <span>For Coffee Shops</span>
            </router-link>
          </li>
          <li>
            <button
              type="button"
              class="px-7 py-3 border-2 border-theme-31 rounded-full font-bold text-gray-600 hover:bg-theme-31 hover:text-white shadow-lg"
            >
              <span>Contact us</span>
            </button>
          </li>
        </ul>
        <button class="ml-auto sm:hidden" ref="burger" @click="toggleMenu">
          <MenuIcon />
        </button>
      </nav>
    </div>
  </header>
</template>
<script setup>import { ref } from 'vue'

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

