<script setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import SquareCafeForm from '../../../components/forms/cafes/SquareCafeForm.vue';
import SquareIntegrate from '../../../components/cards/SquareIntegrate.vue';
const isLoading = ref(false)
const getCompany = computed(() => store.getters["getCompany"])
const globalLoading = computed(() => store.state.common.loadingStatus)

onMounted(async () => {
  store.commit('setLoadingStatus', true);
  await store.dispatch('fetchCompany');
  store.commit('setLoadingStatus', false);
});

</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box" v-if="!globalLoading">
      <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">Square</h2>
      </div>
      <div class="p-5">
        <div v-if="getCompany?.has_square_account">
          <SquareCafeForm />
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
