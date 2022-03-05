<template>
  <div
    v-if="isLoading"
    class="fixed h-screen w-full z-50 flex flex-col justify-center items-center"
    style="background-color: rgba(100, 100, 100, 0.1);"
  >
    <LoadingIcon icon="tail-spin" class="w-16 h-16" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useLoading from '@/features/useLoading.js';

const { isLoading } = useLoading();

</script>
