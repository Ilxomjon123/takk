<script setup>
import { ref } from 'vue';

const props = defineProps({ loading: false });
const emit = defineEmits(['searching']);
const searchInput = ref('');

function onSearch() {
  emit('searching', searchInput.value);
}
</script>

<template>
  <form @submit.prevent="onSearch">
    <div class="input-group">
      <input
        id="tabulator-html-filter-value"
        type="text"
        v-model="searchInput"
        class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
        placeholder="Search..."
        aria-describedby="input-group-search"
      />
      <button id="input-group-search" class="input-group-text" type="submit">
        <LoadingIcon v-if="loading" class="md:my-1" color="#fff" />
        <SearchIcon v-else />
      </button>
    </div>
  </form>
</template>
