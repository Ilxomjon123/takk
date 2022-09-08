<script setup>
const props = defineProps({
  isLoading: false,
});
</script>

<template>
  <button type="submit" class="btn btn-primary" :disabled="isLoading">
    <LoadingIcon
      v-if="isLoading"
      icon="three-dots"
      color="white"
      class="my-2 mx-1"
    />
    <span v-else>Save</span>
  </button>
</template>
