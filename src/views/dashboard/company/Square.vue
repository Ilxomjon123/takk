<script setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import SquareIntegrate from '../../../components/cards/SquareIntegrate.vue';
import SquareCafeList from '../../../components/lists/SquareCafeList.vue';

const getCompany = computed(() => store.getters["getCompany"])
const isLoading = ref(false)
const globalLoading = computed(() => store.state.common.loadingStatus)
</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box">
      <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">Square Cafes List</h2>
        <!-- <div class="ml-4 ml-auto"  v-if="getCompany?.has_square_account">
          <button class="font-medium text-base text-theme-10 hover:text-theme-1 underline" @click="synchSquare" v-if="!loading">
            Sync with Square
          </button>
          <button class="font-medium text-base" v-else>
            <LoadingIcon icon="oval" class="w-8 h-8 my-2" />
          </button>
        </div> -->
      </div>
      <div class="p-5">
        <div v-if="getCompany?.has_square_account">
          <!-- <SquareCafeForm /> -->
          <SquareCafeList />
        </div>
        <div v-else>
          <SquareIntegrate />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ts-input {
  z-index: inherit !important;
}
</style>
