<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';

const route = useRoute();
const router = useRouter();
const isCompany = computed(() => route.name == 'entry-company');
const isCafe = computed(() => route.name == 'entry-cafe');
const isFinish = computed(() => route.name == 'entry-finish');

function logout() {
  confirm('Are you sure?');
  store.dispatch('logout');
  window.location.replace('/');
}
</script>

<template>
  <div>
    <div class="flex items-center mt-8">
      <!-- <h2 class="intro-y text-lg font-medium mr-auto">Wizard Layout</h2> -->
      <button class="btn btn-outline-danger text-white ml-auto" @click="logout">
        Logout
      </button>
    </div>
    <!-- BEGIN: Wizard Layout -->
    <div class="intro-y box py-10 sm:py-20 mt-5">
      <div
        class="wizard flex flex-col lg:flex-row justify-center px-5 sm:px-20"
      >
        <div
          class="intro-x lg:text-center flex items-center lg:block flex-1 z-10"
        >
          <button
            class="w-10 h-10 rounded-full btn"
            :class="
              isCompany
                ? 'btn-primary'
                : 'text-gray-600 bg-gray-200 dark:bg-dark-1'
            "
          >
            1
          </button>
          <div
            :class="
              isCompany
                ? 'lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto'
                : 'lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-gray-700 dark:text-gray-600'
            "
          >
            Setup Company
          </div>
        </div>
        <div
          class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10"
        >
          <button
            class="w-10 h-10 rounded-full btn"
            :class="
              isCafe
                ? 'btn-primary'
                : 'text-gray-600 bg-gray-200 dark:bg-dark-1'
            "
          >
            2
          </button>
          <div
            :class="
              isCafe
                ? 'lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto'
                : 'lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-gray-700 dark:text-gray-600'
            "
          >
            Create Cafe
          </div>
        </div>
        <div
          class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10"
        >
          <button
            class="w-10 h-10 rounded-full btn"
            :class="
              isFinish
                ? 'btn-primary'
                : 'text-gray-600 bg-gray-200 dark:bg-dark-1'
            "
          >
            3
          </button>
          <div
            :class="
              isFinish
                ? 'lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto'
                : 'lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-gray-700 dark:text-gray-600'
            "
          >
            Finished registration
          </div>
        </div>
        <div
          class="wizard__line hidden lg:block w-3/5 bg-gray-200 dark:bg-dark-1 absolute mt-5"
        ></div>
      </div>
      <div
        class="px-5 sm:px-20 mt-10 pt-10 border-t border-gray-200 dark:border-dark-5"
      >
        <RouterView v-slot="{ Component, route }">
          <template v-if="Component">
            <Transition name="fade-fast" mode="out-in">
              <!-- <KeepAlive> -->
              <Suspense>
                <!-- main content -->
                <component :is="Component" :key="route" />

                <!-- loading state -->
                <template #fallback>
                  Loading...
                </template>
              </Suspense>
              <!-- </KeepAlive> -->
            </Transition>
          </template>
        </RouterView>
      </div>
    </div>
    <!-- END: Wizard Layout -->
  </div>
</template>
