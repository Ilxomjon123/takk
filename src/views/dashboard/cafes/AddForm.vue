<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import cash from 'cash-dom';
import store from '@/store';
import CafeMenu from './CafeMenu.vue';
import CafeInformation from './CafeInformation.vue';
import { storeCafe } from '@/api';
import { useNotyf } from '@/composables/useNotyf';

const router = useRouter();
const notyf = useNotyf();
const formFields = ref({
  location: {
    lat: 35.1234,
    lon: -95.1234
  },
  country: 236,
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
const isLoading = ref(false);

async function submit(formData) {
  store.commit('setLoadingStatus', true);

  isLoading.value = true;
  externalErrors.value = {};

  try {
    const res1 = await storeCafe(formData);

    notyf.success();
    router.push('/dashboard/cafes/' + res1.id);
  } catch (error) {
    if (error.response) {
      notyf.error();
      externalErrors.value = error.response?.data;
    }
  } finally {
    store.commit('setLoadingStatus', false);
    isLoading.value = false;
  }
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
        <CafeInformation
          :form-data="formFields"
          @update:form-data="submit($event)"
          :external-errors="externalErrors"
        />
      </div>
    </div>
  </div>
</template>
