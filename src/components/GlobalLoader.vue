<template>
  <div v-if="isLoading" class="absolute w-full z-50 flex flex-col justify-center items-center content"
    style="background-color: rgba(100, 100, 100, 0.1);">
    <LoadingIcon icon="tail-spin" class="w-16 h-16" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoading = computed(() => store.getters.getLoadingStatus);

</script>
