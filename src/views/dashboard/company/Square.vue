<script setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import SuccessNotification from '@/components/notifications/SuccessNotification.vue';
import ErrorNotification from '@/components/notifications/ErrorNotification.vue';
import SimpleImageUpload from '../../../components/forms/file-upload/SimpleImageUpload.vue';

const isLoading = ref(false)
const morning = ref(false)
const day = ref(false)
const evening = ref(false)
const errors = ref(null)
const successMessage = ref("Successfully saved!")
const successNotification = ref(null);
const errorNotification = ref(null);
const getCompany = computed(() => store.getters["getCompany"])
const globalLoading = computed(() => store.state.common.loadingStatus)

onMounted(async () => {
  store.commit('setLoadingStatus', true);
  await store.dispatch('fetchCompany');
  store.commit('setLoadingStatus', false);
});

async function submit() {
  isLoading.value = true;

  const formData = new FormData();

  morning.value && formData.append('app_image_morning', morning.value);
  day.value && formData.append('app_image_day', day.value);
  evening.value && formData.append('app_image_evening', evening.value);
  formData.append('name', getCompany.value.name);
  formData.append('country_code', getCompany.value.country_code);
  errors.value = null;
  const res = await store.dispatch('putCompany', { form: formData, id: getCompany.value.id });
  // await store.dispatch('fetchCompany');

  if (res.status) {
    errors.value = null;
    if (res.status) {
      successNotification.value.show();
    }
    else {
      errorNotification.value.show();
    }
  }
  else {
    errors.value = res.data;
  }
  isLoading.value = false;
}

</script>

<template>
  <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box" v-if="!globalLoading">
      <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">Square</h2>
        <!-- <h2 class="font-medium text-base ml-auto" :class="getCompany.status ? 'text-theme-9' : 'text-theme-6'">{{
            getCompany.status ? 'Active' : 'Not Active'
        }}</h2> -->
      </div>
      <div class="p-5">

      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ts-input {
  z-index: inherit !important;
}
</style>
