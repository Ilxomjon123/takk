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
            <!-- <div class="preview"> -->
            <!-- BEGIN: Validation Form -->
            <form class="validate-form" @submit.prevent="save">
              <div class="flex flex-col md:flex-row gap-5">
                <div class="flex-1">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe info</h2>
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="cafe_timezone"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Cafe timezone
                    </label>
                    <TomSelect
                      id="cafe_timezone"
                      name="cafe_timezone"
                      v-model.trim="validate.cafe_timezone.$model"
                      class="w-full"
                      :class="{
                        'border-theme-6': validate.cafe_timezone.$error
                      }"
                      :options="{
                        placeholder: 'Select a timezone'
                      }"
                    >
                      <option
                        v-for="(zone, index) in timeZones"
                        :key="zone + index"
                        :value="zone"
                        >{{ zone }}</option
                      >
                    </TomSelect>
                    <template v-if="validate.cafe_timezone.$error">
                      <div
                        v-for="(error, index) in validate.cafe_timezone.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="validation-form-1"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Cafe name
                      <span
                        class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                        >Required, at least 1 characters</span
                      >
                    </label>
                    <input
                      id="validation-form-1"
                      v-model.trim="validate.name.$model"
                      type="text"
                      name="name"
                      class="form-control"
                      :class="{ 'border-theme-6': validate.name.$error }"
                      placeholder="Type your cafe name"
                    />
                    <template v-if="validate.name.$error">
                      <div
                        v-for="(error, index) in validate.name.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="call_center"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Call center
                    </label>
                    <input
                      id="call_center"
                      v-model.trim="validate.call_center.$model"
                      type="text"
                      name="call_center"
                      class="form-control"
                      placeholder="Call center phone"
                    />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="website"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Website
                    </label>
                    <input
                      id="website"
                      v-model.trim="validate.website.$model"
                      type="text"
                      name="website"
                      class="form-control"
                      placeholder="Type cafe website"
                    />
                  </div>
                  <div class="input-form flex-1 w-full mt-3">
                    <label for="status" class="form-label">Status</label>
                    <TomSelect
                      id="status"
                      name="status"
                      v-model="validate.status.$model"
                      class="w-full"
                    >
                      <option
                        v-for="(status, index) in formFields.status.options"
                        :key="status.label + index"
                        :value="status.value"
                        >{{ status.label }}</option
                      >
                    </TomSelect>
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="country"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Country
                    </label>
                    <CountrySelect v-model="validate.country.$model" />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="city"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      City
                    </label>
                    <CitySelect v-model="validate.city.$model" />
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form basis-1/2">
                      <label
                        for="state"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        State
                      </label>
                      <input
                        id="state"
                        v-model.trim="validate.state.$model"
                        type="text"
                        name="state"
                        class="form-control"
                        placeholder="Type cafe state"
                      />
                    </div>
                    <div class="input-form basis-1/2">
                      <label
                        for="postal_code"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Postal code
                      </label>
                      <input
                        id="postal_code"
                        v-model.trim="validate.postal_code.$model"
                        type="text"
                        name="postal_code"
                        class="form-control"
                        placeholder="Type cafe postal code"
                      />
                    </div>
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="address"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      v-model.trim="validate.address.$model"
                      type="text"
                      name="address"
                      class="form-control"
                      placeholder="Type cafe address"
                    />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="second_address"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Second address
                    </label>
                    <input
                      id="second_address"
                      v-model.trim="validate.second_address.$model"
                      type="text"
                      name="second_address"
                      class="form-control"
                      placeholder="Type.."
                    />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="description"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      v-model.trim="validate.description.$model"
                      class="form-control"
                      name="description"
                      placeholder="Type your cafe description"
                    ></textarea>
                  </div>
                </div>
                <div class="flex-1">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Cafe weeek time
                    </h2>
                  </div>
                  <!-- <WeekDayTimeForm :week_time="validate.week_time.$model" /> -->
                  <WeekDayTimeForm
                    v-for="day in formData.week_time"
                    :key="day.day"
                    :day="day"
                  />
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Cafe delivery info
                    </h2>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="tax_rate"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Tax rate
                      </label>
                      <input
                        id="tax_rate"
                        v-model.trim="validate.tax_rate.$model"
                        type="number"
                        name="tax_rate"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="order_limit"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Order limit
                      </label>
                      <input
                        id="order_limit"
                        v-model.trim="validate.order_limit.$model"
                        type="number"
                        name="order_limit"
                        class="form-control"
                        placeholder="Type order limit"
                      />
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="order_time_limit"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Order time limit
                      </label>
                      <input
                        id="order_time_limit"
                        v-model.trim="validate.order_time_limit.$model"
                        type="text"
                        name="order_time_limit"
                        class="form-control"
                        placeholder="Type order time limit"
                      />
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="version"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Version
                      </label>
                      <input
                        id="version"
                        v-model.trim="validate.version.$model"
                        type="number"
                        name="version"
                        class="form-control"
                        placeholder="Type a version"
                      />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="form-check w-auto mt-6">
                      <input
                        id="is_use_square"
                        class="form-check-switch"
                        type="checkbox"
                        name="is_use_square"
                        v-model.trim="validate.is_use_square.$model"
                      />
                      <label class="form-check-label" for="is_use_square"
                        >Is use square</label
                      >
                    </div>
                    <div
                      class="input-form"
                      v-if="validate.is_use_square.$model"
                    >
                      <label
                        for="square_location_id"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Square location id
                      </label>
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
                  <CafeDeliveryFields />
                </div>
              </div>
              <LatLongField :location="validate.location.$model" />
              <div class="flex">
                <button type="submit" class="btn btn-primary mt-5 lg:ml-auto">
                  Save
                </button>
              </div>
            </form>
            <!-- END: Validation Form -->
            <!-- BEGIN: Success Notification Content -->
            <div
              id="success-notification-content"
              class="toastify-content hidden flex"
            >
              <CheckCircleIcon class="text-theme-9" />
              <div class="ml-4 mr-4">
                <div class="font-medium">Data saved successfully!</div>
                <div class="text-gray-600 mt-1">
                  Please check your e-mail for further info!
                </div>
              </div>
            </div>
            <!-- END: Success Notification Content -->
            <!-- BEGIN: Failed Notification Content -->
            <div
              id="failed-notification-content"
              class="toastify-content hidden flex"
            >
              <XCircleIcon class="text-theme-6" />
              <div class="ml-4 mr-4">
                <div class="font-medium">Data save failed!</div>
                <div class="text-gray-600 mt-1">
                  Please check the fileld form.
                </div>
              </div>
            </div>
            <!-- END: Failed Notification Content -->
            <!-- </div> -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
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
import formFields from './formFields.js';
import timeZones from './timezones.js';
import cash from 'cash-dom';
import { useStore } from 'vuex';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import CafeWeektimeForm from './CafeWeektimeForm.vue';
import MondayForm from '@/components/forms/cafes/MondayForm.vue';
import TuesdayForm from '@/components/forms/cafes/TuesdayForm.vue';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import LatLongField from '@/components/forms/cafes/LatLongField.vue';
import CafeDeliveryFields from '@/components/forms/cafes/CafeDeliveryFields.vue';
import { each } from 'lodash';

const store = useStore();
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
  cafe_timezone: 'America/New_York',
  location: {
    lat: 37.0902,
    lon: -95.7129
  },
  call_center: '',
  website: '',
  status: '',
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
  is_use_square: false,
  square_location_id: '',
  company: '',
  menu: '',
  is_open: false
});

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
  description: {
    minLength: minLength(1)
  },
  cafe_timezone: { required },
  location: {
    lat: { required, maxValue: 91, minValue: -91 },
    lon: { required, maxValue: 181, minValue: -181 }
  },
  call_center: { maxLength: 50 },
  website: {},
  status: {},
  country: {},
  city: {},
  state: {},
  postal_code: { maxLength: 12 },
  address: {},
  second_address: {},
  tax_rate: {},
  delivery_available: {},
  delivery_max_distance: {},
  delivery_min_amount: {},
  delivery_fee: {},
  delivery_percent: {},
  delivery_km_amount: {},
  delivery_min_time: {},
  version: {},
  order_limit: {},
  order_time_limit: {},
  is_use_square: {},
  square_location_id: {},
  company: {},
  menu: {}
};

const validate = useVuelidate(rules, toRefs(formData));

async function save() {
  validate.value.$touch();
  console.log('cafe formData: ', formData);
  console.log('cafe formData: ', validate);

  if (validate.value.$invalid) {
    Toastify({
      node: cash('#failed-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true
    }).showToast();
  } else {
    const res = await store.dispatch('cafes/cafePost', formData);
    if (res.status) {
      Toastify({
        node: cash('#success-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast();
    }
  }
}
</script>
