<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import cash from 'cash-dom';
import CafeMenu from './CafeMenu.vue';
import CafeInformation from './CafeInformation.vue';
import { storeCafe } from '@/api/admin';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';

const router = useRouter();
const formFields = reactive({
  location: {
    coordinates: [35.1234, -95.1234]
  },
  country: 236,
  state: null,
  city: null,
  name: '',
  call_center: '',
  website: '',
  postal_code: '',
  address: '',
  second_address: '',
  description: '',
  photos: []
});
const externalErrors = ref({});
const selectedCompanyId = computed(
  () => store.getters['getAdminSelectedCompanyID']
);
const notyf = useNotyf();

onMounted(() => {
  selectedCompanyId.value === 0 && showCompanySelectModal();
});

async function submit(formData) {
  store.commit('setLoadingStatus', true);
  // isLoading.value = true
  externalErrors.value = {};

  try {
    const res1 = await storeCafe({
      ...formData,
      company: selectedCompanyId
    });

    router.push('/admin/cafes/' + res1.id);
    notyf.success();
  } catch (error) {
    if (error.response) {
      notyf.error();
      externalErrors.value = error.response.data;
    }
  } finally {
    store.commit('setLoadingStatus', false);
    // isLoading.value = false
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
