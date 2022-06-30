<template>
  <footer class="static bottom-0 w-full py-10">
    <div class="container py-5 flex flex-wrap justify-between">
      <div class="flex lg:mr-5 px-1 py-2">
        <a href="/">
          <img
            class="hidden md:inline-block"
            src="@/assets/images/TAKK_footer.png"
            alt="takk logo"
          />
          <img
            class="md:hidden mt-2"
            src="@/assets/images/Takk_Logo_mobile_footer.svg"
            alt="takk logo"
          />
        </a>
      </div>
      <div
        class="flex flex-wrap gap-4 lg:gap-8 content-center ml-auto lg:ml-10 p-2"
      >
        <img
          class="w-1/5 md:w-auto ml-auto"
          src="@/assets/images/38-instagram.png"
          alt="instagram logo"
        />
        <img
          class="w-1/5 md:w-auto"
          src="@/assets/images/06-facebook.png"
          alt="facebook logo"
        />
        <img
          class="w-1/5 md:w-auto"
          src="@/assets/images/E-mail.png"
          alt="mail logo"
        />
      </div>
      <div class="flex w-full lg:w-auto lg:ml-auto mt-5 md:mt-0">
        <ul
          class="flex flex-wrap p-1 md:p-2 gap-10 content-center text-xl lg:text-3xl text-theme-32 font-medium justify-center w-full"
        >
          <li class="cursor-pointer">Terms</li>
          <li class="cursor-pointer">Privacy</li>
          <li class="cursor-pointer">Copyright</li>
        </ul>
      </div>
      <!-- </div> -->
    </div>
  </footer>
</template>
<script setup></script>

<style scoped lang="scss">
// .container {
//   @media (min-width: 1500px) {
//     max-width: 85%;
//   }
// }
</style>
