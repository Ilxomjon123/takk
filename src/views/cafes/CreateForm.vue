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
                  <div class="input-form flex-1 w-full mt-3">
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
                  <div class="input-form mt-3">
                    <label
                      for="city"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      v-model.trim="validate.city.$model"
                      type="text"
                      name="city"
                      class="form-control"
                      placeholder="Type cafe city"
                    />
                  </div>
                  <div class="input-form mt-3">
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
                  <div class="input-form mt-3">
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
                      for="company"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      v-model.trim="validate.company.$model"
                      type="text"
                      name="company"
                      class="form-control"
                      placeholder="Type.."
                    />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      for="menu"
                      class="form-label w-full flex flex-col sm:flex-row"
                    >
                      Menu
                    </label>
                    <input
                      id="menu"
                      v-model.trim="validate.menu.$model"
                      type="text"
                      name="menu"
                      class="form-control"
                      placeholder="Type.."
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
                  <div class="flex justify-between">
                    <div class="input-form basis-1/2">
                      <label for="week_time_day" class="form-label">Day</label>
                      <TomSelect
                        id="week_time_day"
                        name="week_time_day"
                        v-model.trim="validate.week_time_day.$model"
                        class="w-full"
                        placeholder="Select day.."
                      >
                        <!-- <option value="">Select day..</option> -->
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
                    <div class="form-check w-auto mt-7">
                      <input
                        id="is_open"
                        class="form-check-switch"
                        type="checkbox"
                        name="is_open"
                        v-model="validate.is_open.$model"
                      />
                      <label
                        class="form-check-label whitespace-nowrap"
                        for="is_open"
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
                        type="text"
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
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Cafe delivery info
                    </h2>
                  </div>
                  <div class="flex justify-between">
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
                        type="text"
                        name="tax_rate"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="form-check w-auto mt-9">
                      <input
                        id="delivery_available"
                        class="form-check-switch"
                        type="checkbox"
                        name="delivery_available"
                        v-model.trim="validate.delivery_available.$model"
                      />
                      <label class="form-check-label" for="delivery_available"
                        >Delivery available</label
                      >
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="delivery_max_distance"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery max distance
                      </label>
                      <input
                        id="delivery_max_distance"
                        v-model.trim="validate.delivery_max_distance.$model"
                        type="number"
                        name="delivery_max_distance"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="delivery_min_amount"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery min amount
                      </label>
                      <input
                        id="delivery_min_amount"
                        v-model.trim="validate.delivery_min_amount.$model"
                        type="number"
                        step="0.001"
                        name="delivery_min_amount"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="delivery_fee"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery fee
                      </label>
                      <input
                        id="delivery_fee"
                        v-model.trim="validate.delivery_fee.$model"
                        type="number"
                        step="0.001"
                        name="delivery_fee"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="delivery_percent"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery percent
                      </label>
                      <input
                        id="delivery_percent"
                        v-model.trim="validate.delivery_percent.$model"
                        type="number"
                        step="0.001"
                        name="delivery_percent"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="delivery_km_amount"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery km amount
                      </label>
                      <input
                        id="delivery_km_amount"
                        v-model.trim="validate.delivery_km_amount.$model"
                        type="number"
                        step="0.001"
                        name="delivery_km_amount"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="delivery_min_time"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery min time
                      </label>
                      <input
                        id="delivery_min_time"
                        v-model.trim="validate.delivery_min_time.$model"
                        type="number"
                        name="delivery_min_time"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="version"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery km amount
                      </label>
                      <input
                        id="version"
                        v-model.trim="validate.version.$model"
                        type="number"
                        name="version"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="input-form mt-3 basis-1/2">
                      <label
                        for="order_limit"
                        class="form-label w-full flex flex-col sm:flex-row"
                      >
                        Delivery min time
                      </label>
                      <input
                        id="order_limit"
                        v-model.trim="validate.order_limit.$model"
                        type="number"
                        name="order_limit"
                        class="form-control"
                        placeholder="Type.."
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
                        type="number"
                        name="order_time_limit"
                        class="form-control"
                        placeholder="Type.."
                      />
                    </div>
                    <div class="form-check w-auto mt-9">
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
                  </div>
                  <div class="input-form mt-3">
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
import { useStore } from 'vuex';
import { cafePost } from '@/api/index.js';

const store = useStore();
const formData = reactive({
  name: '',
  description: '',
  opening_time: '',
  closing_time: '',
  week_time_day: '',
  cafe_timezone: 'Asia/Tashkent',
  latitude: '',
  longitude: '',
  call_center: '+998901234567',
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
  menu: '',
  is_open: false
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
  cafe_timezone: { required },
  latitude: { required, maxValue: 91, minValue: -91 },
  longitude: { required, maxValue: 181, minValue: -181 },
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
  menu: {},
  is_open: {}
};
const validate = useVuelidate(rules, toRefs(formData));
const save = async () => {
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
    const res = await cafePost(formData);
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
};
</script>
