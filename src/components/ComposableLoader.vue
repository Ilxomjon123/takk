<template>
  <div
    v-if="isLoading"
    class="absolute h-screen w-full z-50 flex flex-col justify-center items-center"
    style="background-color: rgba(100, 100, 100, 0.1);"
  >
    <LoadingIcon icon="tail-spin" class="w-16 h-16" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import loading from '@/composable-functions/useLoading.js';

const { isLoading } = loading()
console.log('isLoading from ComposableLoader component: ', isLoading.value);

</script>
