<template>
  <header>
    <!-- <div class="container"> -->
    <nav class="container flex items-center p-4 whitespace-nowrap">
      <div class="py-1">
        <img src="/src/assets/images/Takk Logo.png" alt="takk logo" />
      </div>
      <ul
        class="hidden sm:flex flex-1 justify-end items-center gap-12 text-lg text-theme-32 font-medium"
      >
        <li class="cursor-pointer">Preordering</li>
        <li class="cursor-pointer">Delivery</li>
        <li class="cursor-pointer">Loyalty Stamps</li>
        <li class="cursor-pointer">Self Checkout System</li>
        <li class="cursor-pointer">Analytics</li>
        <button type="button" class="px-7 py-3 text-theme-31 font-bold">
          <span>Sign In</span>
        </button>
        <button
          type="button"
          class="px-10 py-3 bg-theme-31 text-white rounded-full font-bold hover:bg-theme-2 hover:text-black shadow-lg"
        >
          <span>Sign Up</span>
        </button>
        <button
          type="button"
          class="px-7 py-3 border-2 border-theme-31 rounded-full font-bold text-gray-600 hover:bg-theme-31 hover:text-white shadow-lg"
        >
          <span>Contact us</span>
        </button>
      </ul>
      <div class="flex flex-1 sm:hidden justify-end">
        <MenuIcon />
      </div>
    </nav>
    <!-- </div> -->
  </header>
</template>
<script setup>
</script>

