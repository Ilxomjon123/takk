<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="/" class="-intro-x flex items-center pt-5">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="w-40"
              :src="`/src/assets/images/new-logo.png`"
            />
            <!-- <span class="text-white text-lg ml-3">
              Ru
              <span class="font-medium">bick</span>
            </span>-->
          </a>
          <div class="my-auto">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-4"
              :src="`/src/assets/images/Hero coffee img.png`"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to
              <br />sign in to your account.
            </div>
            <!-- <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500"
            >Manage all your e-commerce accounts in one place</div>-->
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <LoginForm />
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import cash from 'cash-dom';
import LoginForm from './LoginForm.vue';
// import '@/assets/sass/app.scss';

export default defineComponent({
  components: {
    DarkModeSwitcher,
    LoginForm
  },
  setup() {
    onMounted(() => {
      cash('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login')
    })
  }
})
</script>
