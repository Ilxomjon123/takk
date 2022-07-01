
<script setup>
import { useStore } from 'vuex'
import ErrorNotification from '@/components/notifications/ErrorNotification.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore();
const route = useRoute();
const getStep = computed(() => store.getters['getStep'])
const errorNotification = ref(null);
let is_make_create_order = true;

onMounted(() => {
  const squareError = route.query?.squareError;

  if (typeof squareError !== 'undefined') {
    store.commit('setErrorNotification');
  }
  const step = getStep.value;

});

// async function closeModal() {
//   const res = await store.dispatch('putStep', store.state.user.STEP_COMPANY)
//   if (res.status) {
//     router.go('/entry/company');
//     // window.location.reload();
//   } else {
//     errorNotification.value.show()
//   }
// }

async function gotoSquareUpSite() {
  const res = await store.dispatch('fetchSquareRedirectUrl', { is_make_create_order });
  // console.log(res);
  if (res.status) {
    location.href = res?.data?.url;
  }
  // const SQUARE_APP_ID = "sandbox-sq0idb-O7t0Iz9KjwN1g1l2IeSjAQ"
  // location.href = `https://connect.squareupsandbox.com/login?redirect=/oauth2/authorize?client_id=${SQUARE_APP_ID}&scope=CUSTOMERS_WRITE+CUSTOMERS_READ`
  // location.href = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${SQUARE_APP_ID}&scope=CUSTOMERS_WRITE+CUSTOMERS_READ`
}

</script>

<template>
  <!-- <DarkModeSwitcher /> -->
  <div class="py-10">
    <div class="container">
      <div class="intro-y flex items-center">
        <!-- <h2
        class="text-xl font-medium mr-auto text-white lg:text-center"
        >My Cabinet</h2>-->
      </div>
      <div class="container p-10 bg-theme-2 rounded-md mt-8 mb-24">
        <div class="intro-y flex items-center">
          <!-- BEGIN: Pricing Layout -->
          <div class="intro-y box flex flex-col lg:flex-row w-full">
            <div
              class="intro-y border-b border-t lg:border-b-0 lg:border-t-0 flex-1 p-5 lg:border-l lg:border-r border-gray-200 dark:border-dark-5">
              <CreditCardIcon class="block w-12 h-12 text-theme-1 dark:text-theme-10 mx-auto" />
              <div class="text-xl font-medium text-center mt-10">Standard Plan</div>
              <!-- <div class="text-gray-700 dark:text-gray-600 text-center mt-5">
                1 Domain
                <span class="mx-1">•</span> 10 Users
                <span class="mx-1">•</span> 20 Copies
              </div>-->
              <div class="text-gray-600 dark:text-gray-400 px-10 text-center text-base mx-auto mt-5 min-h-[80px]">
                No risk, 6 months free use of the Takk platform (order accepting system and mobile app). After trial
                period, 1% of sales.
                Plus credit card fees (2.9%+30c) passed on to payment processing companies.
              </div>
              <div class="mt-auto">
                <div class="flex justify-center">
                  <div class="relative text-5xl font-semibold mt-8 mx-auto">
                    <span class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4">$</span>
                    0
                  </div>
                </div>
                <div class="mt-auto">
                  <a type="button" class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8">PURCHASE NOW</a>
                  <!-- <a href="javascript:;" data-toggle="modal" data-target="#squareup-modal-preview"
                    class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8">PURCHASE NOW</a> -->
                </div>
              </div>
            </div>
            <div
              class="intro-y border-b border-t lg:border-b-0 lg:border-t-0 flex-1 p-5 lg:border-l lg:border-r border-gray-200 dark:border-dark-5">
              <BriefcaseIcon class="block w-12 h-12 text-theme-1 dark:text-theme-10 mx-auto" />
              <div class="text-xl font-medium text-center mt-10">Proprietary Plan</div>
              <div class="text-gray-600 dark:text-gray-400 px-10 text-center text-base mx-auto mt-5 min-h-[80px]">Same
                as Standard plan, plus you will have your custom mobile application with your own logo for $49 per
                month.</div>
              <div class="mt-auto">
                <div class="flex justify-center">
                  <div class="relative text-5xl font-semibold mt-8 mx-auto">
                    <span class="absolute text-2xl top-0 left-0 text-gray-600 -ml-4">$</span>
                    49
                  </div>
                </div>
                <div class="mt-auto">
                  <a type="button" class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8">PURCHASE NOW</a>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Pricing Layout -->
        </div>
      </div>
      <div class="hidden md:flex justify-center mx-auto w-full">
        <router-link to="/">
          <img class="mr-12 w-[240px] h-[80px]" src="@/assets/images/App_Store_badge_US.png" alt="App Store badge" />
        </router-link>
        <router-link to="/" class>
          <img class="ml-12 w-[240px] h-[80px]" src="@/assets/images/Google_Play_Badge.png" alt="Google_Play_Badge" />
        </router-link>
      </div>
      <div class="flex md:hidden justify-between">
        <router-link to="/">
          <img class="w-11/12" src="@/assets/images/App_Store_badge_US.png" alt="App Store badge" />
        </router-link>
        <router-link to="/">
          <img class="w-11/12 ml-auto" src="@/assets/images/Google_Play_Badge.png" alt="Google_Play_Badge" />
        </router-link>
      </div>
    </div>

    <!-- SquareUp box -->
    <div class="p-0 mt-5">
      <div class="p-5 text-center">
        <div class="flex justify-center my-3 h-10 mt-3">
          <img src="@/assets/images/Takk_Logo.png" class="mr-3" />
          <img src="@/assets/images/squareup.png" />
        </div>
        <div class="text-3xl mt-5">Do you want to integrate with SquareUp</div>
        <div class="text-base mt-3">
          Do you already use Square? We can import all your menu and products from Square if you like.
        </div>
        <!-- <div class="text-gray-600 mt-2">
                <div class="sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <input id="show-example-1" data-target="#basic-button" class="show-code form-check-switch mr-0 ml-3"
                    type="checkbox" v-model="is_make_create_order" />
                  <label class="form-check-label ml-0 sm:ml-2" for="show-example-1">Do you want to get notifications on
                    SquareApp?</label>
                </div>
              </div> -->
      </div>
      <div class="px-5 pb-8 text-center">
        <button data-dismiss="modal"
          class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1">No</button>
        <button type="button" class="btn btn-success w-24" @click="gotoSquareUpSite">Yes!</button>
      </div>
    </div>

    <!-- <div id="squareup-modal-preview" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <div class="flex justify-center my-3 h-10 mt-3">
                <img src="@/assets/images/Takk_Logo.png" class="mr-3" />
                <img src="@/assets/images/squareup.png" />
              </div>
              <div class="text-3xl mt-5">Do you want to integrate with SquareUp</div>
              <div class="text-base mt-3">Do you already use Square? We can import all your menu and products from
                Square if you like.</div>
              <div class="text-gray-600 mt-2">
                <div class="sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <input id="show-example-1" data-target="#basic-button" class="show-code form-check-switch mr-0 ml-3"
                    type="checkbox" v-model="is_make_create_order" />
                  <label class="form-check-label ml-0 sm:ml-2" for="show-example-1">Do you want to get notifications on
                    SquareApp?</label>
                </div>
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button data-dismiss="modal"
                class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
                >No</button>
              <button type="button" class="btn btn-success w-24" @click="gotoSquareUpSite">Yes!</button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <ErrorNotification ref="errorNotification" />
</template>
