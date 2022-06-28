<template>
  <div class="bg-theme-1">
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="-intro-x lg:mr-20">
          <!-- <img src="@/assets/images/squareup.png" /> -->

          <img
            alt="Takk"
            class="h-48 lg:h-auto"
            src="@/assets/images/square2.png"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <!-- <div class="intro-x text-8xl font-medium">404</div> -->
          <div
            class="intro-x text-xl lg:text-3xl font-medium mt-5 mb-2"
          >Integration successfully created!</div>
        <div class="text-lg intro-x font-medium">Migrating data has started. It may take a few minutes</div>
         <!-- <SqauareCafeForm/> -->
          <router-link
            to="/dashboard"
            class="intro-x btn py-3 px-4 text-white border-white dark:border-dark-5 dark:text-gray-300 mt-10"
          >Go to Dashboard</router-link>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import cash from 'cash-dom'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';
const router = useRouter();
const route = useRoute();
const store = useStore();
onMounted(async () => {
  cash('body')
    .removeClass('main')
    .removeClass('login')
    .addClass('error-page');
  const code = route.query?.code;
  const state = route.query?.state;
  if (typeof code === 'undefined' || typeof state === 'undefined') {
    // location.href = '/entry';
  } else {
    const res = await store.dispatch('postSquareAuth', { code, state });
    console.log(res);
    if (res.status) {
      // location.href = '/entry';
      store.dispatch('putStep', 4);
    } else {
      // location.href = '/entry?squareError=error';
    }
  }
  await store.dispatch('cafes/fetchSquareCafeList')
  // store.dispatch('cafes/storeSquareIDCafe')
})
//   }
// });
</script>