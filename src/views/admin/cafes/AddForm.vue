<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import cash from 'cash-dom';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';
import { storeCafe } from '@/api/admin';
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
    coordinates: [35.1234, -95.1234],
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
const selectedCompanyId = computed(
  () => store.getters['adminCompany/getAdminSelectedCompanyID']
);

watchEffect(() => {
  if (!selectedCompanyId.value) showCompanySelectModal();
});

async function submit(formData) {
  isLoading.value = true;
  Object.assign(externalErrors, {
    name: [],
  });

  formData.company = selectedCompanyId.value;

  try {
    const res1 = await storeCafe(formData);

    router.push('/admin/cafes/' + res1.id);
    notyf.success();
  } catch (error) {
    notyf.error();
    Object.assign(externalErrors, error.response?.data);
  } finally {
    isLoading.value = false;
  }
}

// Show modal
function showCompanySelectModal() {
  cash('#company-select-modal').modal('show');
}
</script>

<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Add Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- <CafeMenu :form-data="formFields" :external-errors="externalErrors" /> -->
      <div class="col-span-12">
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
