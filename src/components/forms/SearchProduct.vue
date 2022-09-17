<script setup>
import { ref } from 'vue';

const props = defineProps({ loading: false });
const emit = defineEmits(['searching', 'search:manual']);
const searchInput = ref('');

function onSearch() {
  emit('searching', searchInput.value);
}

function onSubmit() {
  emit('search:manual', searchInput.value);
}
</script>

<template>
  <div class="w-56 sm:w-full relative text-gray-700 dark:text-gray-300">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="searchInput"
        class="form-control w-56 sm:w-full box pr-10 placeholder-theme-13"
        placeholder="Search..."
        @input="onSearch"
      />
      <SearchIcon
        type="submit"
        class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 cursor-pointer"
        @click="onSearch"
      />
    </form>
  </div>
  <!-- <form @submit.prevent="onSearch">
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
  </form> -->
</template>
