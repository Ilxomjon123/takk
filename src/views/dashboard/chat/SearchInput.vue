<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="pr-1">
    <div class="box my-5">
      <div class="relative text-gray-700 dark:text-gray-300">
        <input type="text" class="form-control py-3 px-4 border-transparent bg-gray-200 pr-10 placeholder-theme-13"
          placeholder="Search for users..." :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" />
        <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" />
      </div>
    </div>
  </div>
</template>
