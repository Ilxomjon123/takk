<script setup>
import { useRouter } from 'vue-router';
import cash from 'cash-dom';
import Toastify from 'toastify-js';
import CafeMenu from './CafeMenu.vue';
import CafeInformation from './CafeInformation.vue';
import { ref } from 'vue';
import { storeCafe } from '../../../api';
import store from '../../../store';

const router = useRouter();
const formFields = ref({
  location: {
    lat: 35.1234,
    lon: -95.1234
  },
  country: 'United States',
  name: '',
  call_center: '',
  website: '',
  state: '',
  city: '',
  postal_code: '',
  address: '',
  second_address: '',
  description: '',
  photos: []
});
const externalErrors = ref({});

async function submit(formData) {
  store.commit('setLoadingStatus', true);
  // isLoading.value = true
  externalErrors.value = {}

  try {
    const res1 = await storeCafe(formData);

    Toastify({
      node: cash('#success-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000,
    }).showToast();
    router.push('/dashboard/cafe/' + res1.id);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      externalErrors.value = error.response.data;
      invalidSubmit();
    }
  } finally {
    store.commit('setLoadingStatus', false);
    // isLoading.value = false
  }
}

function invalidSubmit() {
  Toastify({
    node: cash('#failed-notification-content')
      .clone()
      .removeClass('hidden')[0],
    duration: 3000,
  }).showToast();
}
</script>

<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Add Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <CafeMenu :form-data="formFields" :external-errors="externalErrors" />
      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <CafeInformation :form-data="formFields" @update:form-data="submit($event)" :external-errors="externalErrors" />
      </div>
    </div>
  </div>
</template>
