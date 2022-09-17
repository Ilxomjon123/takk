<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const customers = computed(() => store.getters.getCustomers);
const selectedCustomers = ref([]);

onMounted(() => {
  store.dispatch('fetchCustomers');
});
</script>

<template>
  <TomSelect
    v-model="selectedCustomers"
    :options="{
      placeholder: 'Select customers',
    }"
    multiple
    class="w-full"
  >
    <option value="all">All</option>
    <option
      v-for="(item, index) in customers.results"
      :key="index"
      :value="item.id"
    >
      {{ item.username }}
    </option>
  </TomSelect>
</template>
