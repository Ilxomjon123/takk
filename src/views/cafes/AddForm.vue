<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Create Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <form class="validate-form" @submit.prevent="save">
              <div class="flex flex-col md:flex-row gap-5">
                <div class="flex-1">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe info</h2>
                  </div>
                  <TextField
                    v-model="validate.name.$model"
                    :errors="validate.name.$errors || $externalResults.name"
                    title="Cafe name"
                  />
                  <TextField
                    title="Phone number"
                    v-model="validate.call_center.$model"
                    :errors="validate.call_center.$errors"
                  />
                  <TextField
                    title="Website"
                    v-model="validate.website.$model"
                    :errors="validate.website.$errors"
                  />
                  <div class="input-form mt-3">
                    <label for="cafe_status" class="form-label">Status</label>
                    <StatusSelect
                      id-field="cafe_status"
                      v-model="validate.status.$model"
                      :errors="validate.status.$errors"
                      :status-options="statusOptions"
                    />
                    <template v-if="validate.status.$error">
                      <div
                        v-for="(error, index) in validate.status.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >{{ error.$message }}</div>
                    </template>
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="country"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >Country</label>
                    <CountrySelect v-model="validate.country.$model" />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="city"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >City</label>
                    <CitySelect v-model="validate.city.$model" />
                  </div>
                  <div class="flex gap-5 pt-3">
                    <TextField
                      title="State"
                      v-model="validate.state.$model"
                      :errors="validate.state.$errors"
                      class="basis-1/2"
                    />
                    <TextField
                      title="Postal code"
                      v-model="validate.postal_code.$model"
                      :errors="validate.postal_code.$errors"
                      class="basis-1/2"
                    />
                  </div>
                  <TextField
                    title="Address"
                    v-model="validate.address.$model"
                    :errors="validate.address.$errors"
                    class="basis-1/2"
                  />
                  <TextField
                    title="Second address"
                    v-model="validate.second_address.$model"
                    :errors="validate.second_address.$errors"
                    class="basis-1/2"
                  />
                  <div class="input-form mt-3">
                    <label
                      for="description"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >Description</label>
                    <textarea
                      id="description"
                      v-model.trim="validate.description.$model"
                      class="form-control"
                      :class="{ 'border-theme-6': validate.description.$error }"
                      name="description"
                      placeholder="Type your cafe description"
                    ></textarea>
                    <template v-if="validate.description.$error">
                      <div
                        v-for="(error, index) in validate.description.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >{{ error.$message }}</div>
                    </template>
                  </div>
                </div>
                <div class="flex-1">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe weeek time</h2>
                  </div>
                  <WeekDayTimeForm
                    v-for="day in formData.week_time"
                    :key="day.day"
                    :day="day"
                  />
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe delivery info</h2>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="tax_rate"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >Tax rate</label>
                      <input
                        id="tax_rate"
                        v-model.trim="validate.tax_rate.$model"
                        type="number"
                        name="tax_rate"
                        class="form-control"
                        :class="{ 'border-theme-6': validate.tax_rate.$error }"
                        placeholder="Type.."
                      />
                      <template v-if="validate.tax_rate.$error">
                        <div
                          v-for="(error, index) in validate.tax_rate.$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >{{ error.$message }}</div>
                      </template>
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="order_limit"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >Order limit</label>
                      <input
                        id="order_limit"
                        v-model.trim="validate.order_limit.$model"
                        type="number"
                        name="order_limit"
                        class="form-control"
                        :class="{
                          'border-theme-6': validate.order_limit.$error
                        }"
                        placeholder="Type order limit"
                      />
                      <template v-if="validate.order_limit.$error">
                        <div
                          v-for="(error, index) in validate.order_limit.$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >{{ error.$message }}</div>
                      </template>
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="order_time_limit"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >Order time limit</label>
                      <input
                        id="order_time_limit"
                        v-model.trim="validate.order_time_limit.$model"
                        type="text"
                        name="order_time_limit"
                        class="form-control"
                        :class="{
                          'border-theme-6': validate.order_time_limit.$error
                        }"
                        placeholder="Type order time limit"
                      />
                      <template v-if="validate.order_time_limit.$error">
                        <div
                          v-for="(error, index) in validate.order_time_limit
                          .$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >{{ error.$message }}</div>
                      </template>
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="version"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >Version</label>
                      <input
                        id="version"
                        v-model.trim="validate.version.$model"
                        type="number"
                        name="version"
                        class="form-control"
                        :class="{ 'border-theme-6': validate.version.$error }"
                        placeholder="Type a version"
                      />
                      <template v-if="validate.version.$error">
                        <div
                          v-for="(error, index) in validate.version.$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >{{ error.$message }}</div>
                      </template>
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="form-check w-auto mt-6">
                      <input
                        id="is_square_used"
                        class="form-check-switch"
                        type="checkbox"
                        name="is_square_used"
                        v-model.trim="validate.is_square_used.$model"
                      />
                      <label
                        class="form-check-label"
                        for="is_square_used"
                      >Is use square</label>
                    </div>
                    <div
                      class="input-form"
                      v-if="validate.is_square_used.$model"
                    >
                      <label
                        for="square_location_id"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >Square location id</label>
                      <input
                        id="square_location_id"
                        v-model.trim="validate.square_location_id.$model"
                        type="text"
                        name="square_location_id"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                  </div>
                  <CafeDeliveryFields :delivery="validate.delivery.$model" />
                </div>
              </div>
              <LatLongField
                :location="validate.location.$model"
                :latError="validate.location.lat.$error"
                :latErrors="validate.location.lat.$errors"
                :lonError="validate.location.lon.$error"
                :lonErrors="validate.location.lon.$errors"
              />
              <div
                class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
              >
                <label class="form-label">Cafe Logo</label>
                <div class="h-40 image-fit cursor-pointer zoom-in mx-auto mb-3">
                  <img class="rounded-md" alt="Logo" :src="logo" />
                  <input
                    type="file"
                    hidden
                    id="logo-image"
                    @change="changeLogo"
                  />
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <button
                    type="button"
                    @click="clickInput('logo-image')"
                    class="btn btn-primary w-full"
                  >Change Photo</button>
                </div>
              </div>
              <div class="flex">
                <button
                  type="submit"
                  class="btn btn-primary mt-5 lg:ml-auto"
                  :disabled="isLoading"
                >
                  <LoadingIcon
                    v-if="isLoading"
                    icon="tail-spin"
                    class="w-4 h-4 mr-3"
                    color="#fff"
                  />
                  <span>Save</span>
                </button>
              </div>
            </form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';
import {
  required,
  minLength,
  maxLength,
  email,
  url,
  integer,
  maxValue,
  minValue,
  helpers
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Toastify from 'toastify-js';
import timeZones from './timezones.js';
import cash from 'cash-dom';
import { useStore } from 'vuex';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import LatLongField from '@/components/forms/cafes/LatLongField.vue';
import CafeDeliveryFields from '@/components/forms/cafes/CafeDeliveryFields.vue';
import TextField from '../../components/forms/cafes/TextField.vue';
import StatusSelect from '../../components/forms/cafes/CafeStatusSelect.vue';
import MultipleImageUpload from '../../components/forms/file-upload/MultipleImageUpload.vue';

const store = useStore();
const isLoading = ref(false)
const $externalResults = ref({})
const logo = ref(null)

const statusOptions = reactive([
  { label: 'Inactive', value: 0 },
  { label: 'Active', value: 1 },
  { label: 'Unknown', value: 2 }
]);

const formData = reactive({
  name: '',
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
  // cafe_timezone: 'America/New_York',
  location: {
    lat: 37.0902,
    lon: -95.7129
  },
  call_center: '',
  website: '',
  status: 0,
  country: '',
  city: '',
  state: '',
  postal_code: '',
  address: '',
  second_address: '',
  tax_rate: '',
  delivery: {
    delivery_available: false,
    delivery_max_distance: '',
    delivery_min_amount: '',
    delivery_fee: '',
    delivery_percent: '',
    delivery_km_amount: '',
    delivery_min_time: ''
  },
  version: '',
  order_limit: '',
  order_time_limit: '',
  is_square_used: false,
  square_location_id: '',
  menu: ''
});

// Vuelidate
const alpha = helpers.regex(
  'alpha',
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
);

const rules = {
  name: {
    required,
    minLength: minLength(1)
  },
  week_time: {
    required,
    $each: {
      day: { required },
      opening_time: {},
      closing_time: {},
      is_open: {}
    }
  },
  description: { required, minLength: minLength(1) },
  // cafe_timezone: { required },
  location: {
    lat: { required, maxValue: 91, minValue: -91 },
    lon: { required, maxValue: 181, minValue: -181 }
  },
  call_center: { required, maxLength: 50 },
  website: {},
  status: { required },
  country: {},
  city: {},
  state: {},
  postal_code: { maxLength: 12 },
  address: {},
  second_address: {},
  tax_rate: { required },
  delivery: {
    delivery_available: {},
    delivery_max_distance: {},
    delivery_min_amount: {},
    delivery_fee: {},
    delivery_percent: {},
    delivery_km_amount: {},
    delivery_min_time: {}
  },
  version: { required },
  order_limit: { required },
  order_time_limit: { required },
  is_square_used: {},
  square_location_id: {},
  menu: {}
};

const validate = useVuelidate(rules, toRefs(formData), { $externalResults });

async function save() {
  isLoading.value = true

  validate.value.$touch();
  console.log('cafe formData: ', validate);

  if (validate.value.$invalid) {
    Toastify({
      node: cash('#failed-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000,
    }).showToast();
    isLoading.value = false
  } else {
    try {
      const res = await store.dispatch('cafes/cafePost', formData);
      if (res.status) {
        Toastify({
          node: cash('#success-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        $externalResults.value = error.response.data;
      }
    } finally {
      isLoading.value = false
    }

  }

}

function clickInput(name) {
  document.getElementById(name).click();
}

function changeLogo(e) {
  logo.value = URL.createObjectURL(e.target.files[0])
}

function removeLogo() {
  //
}
</script>
