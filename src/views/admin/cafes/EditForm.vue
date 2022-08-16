<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { isEmpty } from 'lodash';
import cash from 'cash-dom';

import store from '@/store';
import CafeMenu from './CafeMenu.vue';
import CafeInformation from './CafeInformation.vue';
import CafeOperations from './CafeOperations.vue';
import CafeDelivery from './CafeDelivery.vue';
import CafeGallery from './CafeGallery.vue';
import CafeWorkingDays from './CafeWorkingDays.vue';
import {
  fetchCafe,
  updateCafe,
  deleteCafe,
  deleteCafeImage
} from '@/api/admin';
import router from '@/router';
import Toastify from 'toastify-js';

const route = useRoute();
const currentItem = ref('CafeInformation');
const formFields = reactive({
  location: {
    coordinates: [35.1234, -95.1234]
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
  week_time: [
    {
      day: 'monday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'tuesday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'wednesday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'thursday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'friday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'saturday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'sunday',
      opening_time: null,
      closing_time: null,
      is_open: false
    }
  ],
  delivery_available: false,
  delivery_max_distance: 1,
  delivery_min_amount: 50,
  delivery_fee: 3,
  delivery_percent: 10,
  delivery_km_amount: 0,
  delivery_min_time: 30,
  cafe_timezone: 'America/New_York',
  status: 0
});
const externalErrors = ref({});
// const toastify = useToastify();
const components = {
  CafeInformation,
  CafeOperations,
  CafeDelivery,
  CafeGallery,
  CafeWorkingDays
};

watch(
  () => route.params.id,
  async newVal => {
    console.log('newVal: ', newVal);
    if (newVal) {
      store.commit('setLoadingStatus', true);
      const res1 = await fetchCafe(newVal);
      Object.assign(formFields, res1);
      // formFields.country = Number(res1.country);
      // formFields.state = Number(res1.state);
      // formFields.city = Number(res1.city);
      store.commit('setLoadingStatus', false);
    }
  },
  { deep: true, immediate: true }
);

function changeComponent(componentName) {
  currentItem.value = componentName;
}

async function submit(formData) {
  store.commit('setLoadingStatus', true);

  externalErrors.value = {};
  delete formData.logo;

  try {
    await updateCafe({
      data: formData,
      id: route.params.id
    });

    Toastify({
      node: cash('#success-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000
    }).showToast();
    // toastify.success('Successfully updated');
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      externalErrors.value = error.response.data;
      invalidSubmit();
    }
  } finally {
    store.commit('setLoadingStatus', false);
  }
}

function invalidSubmit() {
  Toastify({
    node: cash('#failed-notification-content')
      .clone()
      .removeClass('hidden')[0],
    duration: 3000
  }).showToast();
}

function openConfirmModal() {
  cash('#delete-confirmation-modal').modal('show');
}

async function removeCafe() {
  store.commit('setLoadingStatus', true);
  cash('#delete-confirmation-modal').modal('hide');
  if (!isEmpty(formFields.photos)) {
    formFields.photos.forEach(async ({ id }) => await deleteCafeImage(id));
  }
  await deleteCafe(formFields.id);
  store.commit('setLoadingStatus', false);
  router.back();
  // Toastify({
  //   node: cash('#success-notification-content')
  //     .clone()
  //     .removeClass('hidden')[0],
  //   duration: 3000,
  // }).showToast();
}
</script>

<template>
  <div>
    <div>
      <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Cafe Edit Form</h2>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <CafeMenu
          @update:selected-item="changeComponent($event)"
          form-type="edit"
          :form-data="formFields"
          :external-errors="externalErrors"
          @remove:form-data="openConfirmModal"
        />
        <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
          <component
            :is="components[currentItem]"
            :form-data="formFields"
            :external-errors="externalErrors"
            @update:form-data="submit($event)"
          />
        </div>
      </div>
    </div>

    <!-- BEGIN: Delete Confirmation Modal -->
    <div
      id="delete-confirmation-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these records?
                <br />This process cannot be undone.
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-24 mr-1"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger w-24"
                @click="removeCafe"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Delete Confirmation Modal -->
  </div>
</template>
