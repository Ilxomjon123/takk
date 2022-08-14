<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import store from '@/store';
import CategoryForm from './CategoryForm.vue';

const route = useRoute();
const loadingStatus = computed(() => store.getters['getLoadingStatus']);
const category = computed(() => store.getters['getCategory']);
const id = route.params?.id ?? null;

onMounted(async () => {
  store.commit('setLoadingStatus', true);
  await store.dispatch('fetchCategory', id);
  store.commit('setLoadingStatus', false);
});
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->

      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-12 2xl:col-span-12">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5" v-if="!loadingStatus">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Edit Category</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-6">
              <CategoryForm
                :form="category"
                dispatcher="adminCategory/putCategory"
                :isEdit="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
