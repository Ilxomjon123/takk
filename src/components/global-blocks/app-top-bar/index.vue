<template>
  <header>
    <!-- <div class="container"> -->
    <nav class="container flex items-center p-4 whitespace-nowrap">
      <div>
        <img
          class="object-cover"
          src="/src/assets/images/Takk Logo.png"
          alt="takk logo"
        />
      </div>
      <ul
        ref="menu"
        class="sm:flex flex-1 items-center gap-12 text-lg text-theme-32 font-medium ml-16"
        :class="{ hidden: !isOpen }"
      >
        <li class="cursor-pointer">
          <a href="#preordering-rectangle">Preordering</a>
        </li>
        <li class="cursor-pointer">
          <a href="#delivery-rectangle">Delivery</a>
        </li>
        <li class="cursor-pointer">
          <a href="#loyalty-stamps-rectangle">Loyalty Stamps</a>
        </li>
        <li class="cursor-pointer">
          <a href="#self-checkout-rectangle">Self Checkout System</a>
        </li>
        <li class="cursor-pointer">
          <a href="#analytics-rectangle">Analytics</a>
        </li>
        <li>
          <button type="button" class="px-7 py-3 text-theme-31 font-bold">
            <span>Sign In</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            class="px-10 py-3 bg-theme-31 text-white rounded-full font-bold hover:bg-theme-2 hover:text-black shadow-lg"
          >
            <span>For Customers</span>
          </button>
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
    <!-- </div> -->
  </header>
</template>
<script setup>import { ref } from 'vue'

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

