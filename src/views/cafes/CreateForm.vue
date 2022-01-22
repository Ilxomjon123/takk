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
            <div class="preview">
              <!-- BEGIN: Validation Form -->
              <form
                class="validate-form flex flex-row gap-5"
                @submit.prevent="save"
              >
                <div class="lg:basis-1/2">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe info</h2>
                  </div>
                  <div class="input-form">
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
                  <div class="input-form flex-1 w-full">
                    <label for="status" class="form-label">Status</label>
                    <TomSelect
                      id="status"
                      name="status"
                      v-model="status"
                      class="w-full"
                    >
                      <option
                        v-for="(status, index) in formFields.status.options"
                        :key="status.label + index"
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
                    <input
                      id="country"
                      v-model.trim="validate.country.$model"
                      type="text"
                      name="country"
                      class="form-control"
                      placeholder="Type cafe country"
                    />
                  </div>
                </div>
                <div class="lg:basis-1/2">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Cafe weeek time
                    </h2>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form flex-1 w-full">
                      <label for="week_time_day" class="form-label">Day</label>
                      <TomSelect
                        id="week_time_day"
                        name="week_time_day"
                        v-model.trim="validate.week_time_day.$model"
                        class="w-full"
                      >
                        <option
                          v-for="(day, index) in formFields.week_time.day
                            .options"
                          :key="day + index"
                          >{{ day }}</option
                        >
                      </TomSelect>
                      <template v-if="validate.week_time_day.$error">
                        <div
                          v-for="(error, index) in validate.week_time_day
                            .$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                    <div class="form-check flex-1 w-auto ml-auto">
                      <input
                        id="checkbox-switch-7"
                        class="form-check-switch"
                        type="checkbox"
                        name="is_open"
                        v-model="is_open"
                      />
                      <label class="form-check-label" for="checkbox-switch-7"
                        >Is open</label
                      >
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3">
                      <label
                        for="opening_time"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Opening time
                      </label>
                      <input
                        id="opening_time"
                        v-model.trim="validate.opening_time.$model"
                        type="time"
                        name="opening_time"
                        class="form-control timepicker"
                      />
                    </div>
                    <div class="input-form mt-3">
                      <label
                        for="closing_time"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Closing time
                      </label>
                      <input
                        id="closing_time"
                        v-model.trim="validate.closing_time.$model"
                        type="time"
                        name="closing_time"
                        class="form-control timepicker"
                      />
                    </div>
                    <div class="input-form mt-3">
                      <label
                        for="cafe_timezone"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Cafe timezone
                      </label>
                      <input
                        id="cafe_timezone"
                        v-model.trim="validate.cafe_timezone.$model"
                        type="number"
                        name="cafe_timezone"
                        class="form-control"
                      />
                      <template v-if="validate.cafe_timezone.$error">
                        <div
                          v-for="(error, index) in validate.cafe_timezone
                            .$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Cafe location
                    </h2>
                  </div>
                  <div class="flex gap-5">
                    <div class="basis-1/2 input-form mt-3">
                      <label
                        for="latitude"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Latitude
                      </label>
                      <input
                        id="latitude"
                        v-model.trim="validate.latitude.$model"
                        type="number"
                        step="0.000001"
                        name="latitude"
                        class="form-control"
                      />
                      <template v-if="validate.latitude.$error">
                        <div
                          v-for="(error, index) in validate.latitude.$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                    <div class="basis-1/2 input-form mt-3">
                      <label
                        for="longitude"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Longitude
                      </label>
                      <input
                        id="longitude"
                        v-model.trim="validate.longitude.$model"
                        type="number"
                        step="0.000001"
                        name="longitude"
                        class="form-control"
                      />
                      <template v-if="validate.longitude.$error">
                        <div
                          v-for="(error, index) in validate.longitude.$errors"
                          :key="index"
                          class="text-theme-6 mt-2"
                        >
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>
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
            </div>
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
import cash from 'cash-dom';

const formData = reactive({
  name: '',
  description: '',
  opening_time: '',
  closing_time: '',
  week_time_day: '',
  cafe_timezone: '',
  latitude: '',
  longitude: '',
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
  delivery_available: '',
  delivery_max_distance: '',
  delivery_min_amount: '',
  delivery_fee: '',
  delivery_percent: '',
  delivery_km_amount: '',
  delivery_min_time: '',
  version: '',
  order_limit: '',
  order_time_limit: '',
  is_use_square: '',
  square_location_id: '',
  company: '',
  menu: ''
});
const rules = {
  name: {
    required,
    minLength: minLength(1)
  },
  week_time_day: {
    required
    // minLength: minLength(2)
  },
  description: {
    minLength: minLength(1)
  },
  opening_time: {},
  closing_time: {},
  cafe_timezone: { required, maxValue: 24 },
  latitude: { required, maxValue: 91, minValue: -91 },
  longitude: { required, maxValue: 181, minValue: -181 },
  call_center: { maxLength: 50 },
  website: {},
  status: {},
  country: {},
  city: {},
  state: {},
  postal_code: {},
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
const save = () => {
  validate.value.$touch();
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
};
</script>
