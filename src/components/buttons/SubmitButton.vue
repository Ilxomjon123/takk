<script setup>
const props = defineProps({
  isLoading: false,
  text: {
    type: String,
    default: 'Save',
  },
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
    <span v-else>{{ text }}</span>
  </button>
</template>
