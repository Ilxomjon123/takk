<template>
  <div class="pr-1">
    <div class="box p-5 my-5">
      <div class="relative text-gray-700 dark:text-gray-300">
        <input
          type="text"
          class="form-control py-3 px-4 border-transparent bg-gray-200 pr-10 placeholder-theme-13"
          placeholder="Search for users..."
          @input="search"
        />
        <SearchIcon
          class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import useChatState from '@/features/useChatState';

const props = defineProps({
  list: Array
});
// const result = reactive([]);

const { setChatList } = useChatState();

function search(event) {
  const searchString = event.target.value.toLowerCase();
  console.log('searchString: ', searchString);
  const filteredArr = props.list.filter(item => item.user?.username.toLowerCase().includes(searchString))
  console.log('filteredArr: ', [...filteredArr]);
  setChatList([...filteredArr]);
  // emit('update:list', result);
}
</script>
