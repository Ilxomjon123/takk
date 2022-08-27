<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isEmpty } from 'lodash';
import cash from 'cash-dom';
import Toastify from 'toastify-js';

import store from '@/store';
import CafeMenu from './CafeMenu.vue';
import CafeInformation from './CafeInformation.vue';
import CafeOperations from './CafeOperations.vue';
import CafeDelivery from './CafeDelivery.vue';
import CafeGallery from './CafeGallery.vue';
import CafeWorkingDays from './CafeWorkingDays.vue';
import { fetchCafe, updateCafe, deleteCafe, deleteCafeImage } from '@/api';
import router from '@/router';
import { useNotyf } from '@/composables/useNotyf';

const route = useRoute();
const notyf = useNotyf();
const currentItem = ref('CafeInformation');
const formFields = ref({
  location: {
    lat: 35.1234,
    lon: -95.1234
  },
  country: '',
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

onMounted(async () => {
  store.commit('setLoadingStatus', true);
  const res1 = await fetchCafe(route.params.id);
  // store.commit('setSelectedCountry', res1.country);
  // store.dispatch('fetchCitiesByCountry', res1.country)
  formFields.value = res1;
  store.commit('setLoadingStatus', false);
});

function changeComponent(componentName) {
  currentItem.value = componentName;
}

async function submit(formData) {
  store.commit('setLoadingStatus', true);

  externalErrors.value = {};
  delete formData.logo;

  try {
    await updateCafe({ data: formData, id: route.params.id });

    notyf.error();
  } catch (error) {
    if (error.response) {
      notyf.error();
      externalErrors.value = error.response.data;
    }
  } finally {
    store.commit('setLoadingStatus', false);
  }
}

function openConfirmModal() {
  cash('#delete-confirmation-modal').modal('show');
}

async function removeCafe() {
  store.commit('setLoadingStatus', true);
  cash('#delete-confirmation-modal').modal('hide');
  if (!isEmpty(formFields.value.photos)) {
    formFields.value.photos.forEach(
      async ({ id }) => await deleteCafeImage(id)
    );
  }
  await deleteCafe(formFields.value.id);
  store.commit('setLoadingStatus', false);
  router.push('/dashboard/cafes');
}
</script>

<template>
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
          :is="
            currentItem === 'CafeOperations'
              ? CafeOperations
              : currentItem === 'CafeDelivery'
              ? CafeDelivery
              : currentItem === 'CafeGallery'
              ? CafeGallery
              : currentItem === 'CafeWorkingDays'
              ? CafeWorkingDays
              : CafeInformation
          "
          :form-data="formFields"
          :external-errors="externalErrors"
          @update:form-data="submit($event)"
        />
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
