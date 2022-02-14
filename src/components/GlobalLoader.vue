<template>
  <div
    v-if="isLoadingFromState"
    class="absolute h-screen w-full z-50 flex flex-col justify-center items-center"
    style="background-color: rgba(100, 100, 100, 0.1);"
  >
    <LoadingIcon icon="tail-spin" class="w-16 h-16" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import isLoading from '@/composable-functions/loading.js';

const store = useStore();

const isLoadingFromState = computed(() => store.getters.getLoadingStatus);
const isLoadingFromComposable = computed(() => isLoading());

</script>
