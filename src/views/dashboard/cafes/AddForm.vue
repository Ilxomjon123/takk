<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import cash from 'cash-dom';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';
import { storeCafe } from '@/api';
import CafeInformation from './CafeInformation.vue';
import CafeMenu from './CafeMenu.vue';

const router = useRouter();
const notyf = useNotyf();
const formFields = reactive({
  address: '',
  call_center: '',
  city: '',
  country: 236,
  description: '',
  location: {
    lat: 35.1234,
    lon: -95.1234,
  },
  name: '',
  phone_code: '',
  photos: [],
  postal_code: '',
  second_address: '',
  state: '',
  status: 0,
  website: '',
});
const externalErrors = reactive({
  name: [],
});
const isLoading = ref(false);

async function submit(formData) {
  isLoading.value = true;
  Object.assign(externalErrors, {
    name: [],
  });

  try {
    const res1 = await storeCafe(formData);

    notyf.success();
    router.push('/dashboard/cafes/' + res1.id);
  } catch (error) {
    notyf.error();
    Object.assign(externalErrors, error.response?.data);
  } finally {
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
      <!-- <CafeMenu :form-data="formFields" :external-errors="externalErrors" /> -->
      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <CafeInformation
          :form-data="formFields"
          :is-loading="isLoading"
          @update:form-data="submit($event)"
          :external-errors="externalErrors"
        />
      </div>
    </div>
  </div>
</template>
