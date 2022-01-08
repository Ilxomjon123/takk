<template>
  <!-- Hero rectangle -->
  <section class="hero-rectangle">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-5 lg:mt-10 rounded-lg"
    >
      <div class="flex flex-1 flex-col lg:items-start">
        <h2
          class="text-3xl md:text-4xl text-black font-bold lg:text-5xl text-center lg:text-left mb-6"
        >The all you need app for your coffee shop.</h2>
        <div class="flex flex-wrap">
          <button type="button" class="btn-primary">Sign Up</button>
        </div>
      </div>
      <div class="flex justify-center flex-1">
        <img src="/src/assets/images/Hero coffee img.png" alt="Hero image" />
      </div>
    </div>
  </section>
  <section class="preordering-rectangle rounded-lg">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-5 lg:mt-10 rounded-lg"
    >
      <div class="flex flex-1 flex-col">
        <img
          src="/src/assets/images/preordering-img.png"
          alt="Preordering image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const str = ref("Hello Takk");

</script>

<style scoped>
.btn {
  @apply shadow-md py-3 px-6 transition duration-300 rounded-full font-bold;
}
.btn-primary {
  @apply bg-theme-31 text-white border-0 shadow-lg py-4 px-12 rounded-full font-bold hover:bg-theme-2 hover:text-black text-xl;
}

.hero-rectangle .container {
  background-image: url("/src/assets/images/Hero Rectangle.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
