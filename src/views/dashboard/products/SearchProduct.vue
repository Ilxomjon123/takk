<script setup>
// const props = defineProps({
//   modelValue: String
// });

const emit = defineEmits(['searching']);
</script>

<template>
  <form>
    <input id="tabulator-html-filter-value" @input="emit('searching', $event.target.value)" type="text"
      class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0" placeholder="Search..." />
  </form>
</template>
