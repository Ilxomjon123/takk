<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Add Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <Form
              class="validate-form"
              @submit="submit"
              :validation-schema="schema"
              @invalid-submit="invalidSubmit"
              v-slot="{ values }"
            >
              <div class="flex flex-col md:flex-row gap-5">
                <div class="md:basis-1/2 lg:basis-1/3">
                  <SimpleImageUpload
                    :image-path="logoPath"
                    @update-image-path="logoPath = $event"
                  />
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe weeek time</h2>
                  </div>
                  <WeekDayTimeForm
                    v-for="day, index in weekTime"
                    :key="day.day"
                    :day="day"
                    @update:opening_time="weekTime[index]['opening_time'] = $event"
                    @update:closing_time="weekTime[index]['closing_time'] = $event"
                    @update:is_open="weekTime[index]['is_open'] = $event"
                  />
                  <div class="flex gap-5 pt-3">
                    <div class="input-form basis-1/2">
                      <label for="tax_rate" class="form-label">Tax rate</label>
                      <Field
                        id="tax_rate"
                        name="tax_rate"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage name="tax_rate" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form basis-1/2">
                      <label for="order_limit" class="form-label">Order limit</label>
                      <Field
                        id="order_limit"
                        name="order_limit"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage
                        name="order_limit"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form basis-1/2">
                      <label
                        for="order_time_limit"
                        class="form-label"
                      >Order time limit</label>
                      <Field
                        id="order_time_limit"
                        name="order_time_limit"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage
                        name="order_time_limit"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                    <div class="input-form basis-1/2">
                      <label for="version" class="form-label">Version</label>
                      <Field
                        id="version"
                        name="version"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage name="version" class="text-theme-6 mt-2" />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="form-check w-auto">
                      <Field
                        id="is_square_used"
                        name="is_use_square"
                        class="form-check-switch"
                        type="checkbox"
                        :value="true"
                        @input="toggleFunc1"
                      />
                      <label
                        class="form-check-label"
                        for="is_square_used"
                      >Is square used</label>
                    </div>
                    <div class="input-form" v-if="isSquareUsed === true">
                      <label
                        for="square_location_id"
                        class="form-label"
                      >Square location id</label>
                      <Field
                        id="square_location_id"
                        name="square_location_id"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe delivery info</h2>
                  </div>
                  <div class="flex gap-5">
                    <div class="form-check w-auto">
                      <input
                        id="delivery_available"
                        class="form-check-switch"
                        type="checkbox"
                        v-model="delivery.delivery_available"
                        @input="toggleFunc2"
                      />
                      <label
                        class="form-check-label"
                        for="delivery_available"
                      >Delivery available</label>
                    </div>
                  </div>
                  <template v-if="delivery.delivery_available">
                    <div class="flex gap-5 pt-3">
                      <div class="input-form basis-1/2">
                        <label
                          for="delivery_max_distance"
                          class="form-label w-full flex flex-col sm:flex-row"
                        >Delivery max distance</label>
                        <input
                          id="delivery_max_distance"
                          v-model="delivery.delivery_max_distance"
                          type="number"
                          name="delivery_max_distance"
                          class="form-control"
                          placeholder="Type.."
                        />
                      </div>
                      <div class="input-form basis-1/2">
                        <label
                          for="delivery_min_amount"
                          class="form-label w-full flex flex-col sm:flex-row"
                        >Delivery min amount</label>
                        <input
                          id="delivery_min_amount"
                          v-model="delivery.delivery_min_amount"
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
                        >Fixed fee</label>
                        <input
                          id="delivery_fee"
                          v-model="delivery.delivery_fee"
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
                        >% of order fee</label>
                        <input
                          id="delivery_percent"
                          v-model="delivery.delivery_percent"
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
                        >Fee per kilometer</label>
                        <input
                          id="delivery_km_amount"
                          v-model="delivery.delivery_km_amount"
                          type="number"
                          name="delivery_km_amount"
                          class="form-control"
                          placeholder="Type.."
                        />
                      </div>
                      <div class="input-form mt-3 basis-1/2">
                        <label
                          for="delivery_min_time"
                          class="form-label w-full flex flex-col sm:flex-row"
                        >Delivery min time</label>
                        <input
                          id="delivery_min_time"
                          v-model="delivery.delivery_min_time"
                          type="number"
                          name="delivery_min_time"
                          class="form-control"
                          placeholder="Type.."
                        />
                      </div>
                    </div>
                  </template>
                </div>
                <div class="md:basis-1/2 lg:basis-2/3">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe info</h2>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="name">Cafe name</label>
                      <Field id="name" name="name" class="form-control" />
                      <ErrorMessage name="name" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="call_center">Phone number</label>
                      <Field
                        id="call_center"
                        name="call_center"
                        class="form-control"
                      />
                      <ErrorMessage
                        name="call_center"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="website">Website</label>
                      <Field id="website" name="website" class="form-control" />
                      <ErrorMessage name="website" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form md:basis-1/2">
                      <label for="cafe_status" class="form-label">Status</label>
                      <Field
                        as="select"
                        name="status"
                        id="cafe_status"
                        v-model="selectedStatus"
                        class="form-select"
                      >
                        <option
                          v-for="(item, index) in statusOptions"
                          :key="item.label + index"
                          :value="item.value"
                        >{{ item.label }}</option>
                      </Field>
                      <ErrorMessage name="status" class="text-theme-6 mt-2" />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form flex-1 md:basis-1/2">
                      <label for="country" class="form-label">Country</label>
                      <CountrySelect v-bind="field" v-model="selectedCountry" />
                    </div>
                    <div class="input-form flex-1 md:basis-1/2">
                      <label for="city" class="form-label">City</label>
                      <CitySelect v-model="selectedCity" />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="state">State</label>
                      <Field
                        id="state"
                        name="state"
                        class="form-control"
                        placeholder="Type state"
                      />
                      <ErrorMessage name="state" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="postal_code">Postal code</label>
                      <Field
                        id="postal_code"
                        name="postal_code"
                        class="form-control"
                        placeholder="Type postal code"
                      />
                      <ErrorMessage
                        name="postal_code"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="address">Address</label>
                      <Field
                        id="address"
                        name="address"
                        class="form-control"
                        placeholder="Type address"
                      />
                      <ErrorMessage name="address" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form md:basis-1/2">
                      <label
                        class="form-label"
                        for="second_address"
                      >Second address</label>
                      <Field
                        id="second_address"
                        name="second_address"
                        class="form-control"
                        placeholder="Type second address"
                      />
                      <ErrorMessage
                        name="second_address"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="input-form mt-3">
                    <label for="description" class="form-label">Description</label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      class="form-control"
                      placeholder="Type your cafe description"
                    ></Field>
                    <ErrorMessage name="description" class="text-theme-6 mt-2" />
                  </div>
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe location info</h2>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form basis-1/2">
                      <label for="latitude" class="form-label">Latitude</label>
                      <Field
                        id="latitude"
                        name="location.lat"
                        v-model="location.lat"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage
                        name="location.lat"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                    <div class="input-form basis-1/2">
                      <label for="longitude" class="form-label">Longitude</label>
                      <Field
                        id="longitude"
                        name="location.lon"
                        v-model="location.lon"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage
                        name="location.lon"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="mt-5 map_container">
                    <div id="map"></div>
                  </div>
                </div>
              </div>
              <div class="flex">
                <button
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
              <!-- <pre>{{ values }}</pre> -->
            </Form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import DynamicForm from '../../components/forms/DynamicForm.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import LatLongField from '@/components/forms/cafes/LatLongField.vue';
import CafeDeliveryFields from '@/components/forms/cafes/CafeDeliveryFields.vue';
import TextInput from '../../components/forms/TextInput.vue';
import L, { latLng, CRS } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import Toastify from 'toastify-js';
import { cafePost } from '../../api';
import cash from 'cash-dom';

export default defineComponent({
  components: {
    DynamicForm,
    Form,
    Field,
    ErrorMessage,
    SimpleImageUpload,
    CountrySelect,
    CitySelect,
    WeekDayTimeForm,
    LatLongField,
    CafeDeliveryFields,
    TextInput
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().min(1, "Please enter a name more than 1 character").required("This field is requried"), // ok
      description: yup.string().min(1, "Must be more than 1 characters").required("This field is requried"), // ok
      location: yup.object({
        lat: yup
          .number()
          .typeError('must be a decimal number')
          .min(-90, 'Must be more than -90')
          .max(90, "Must be less than 90")
          .required("This field is requried")
          .default(35.1234),
        lon: yup
          .number()
          .typeError('must be a decimal number')
          .min(-180, 'Must be more than -180')
          .max(180, "Must be less than 180")
          .required("This field is requried")
          .default(-95.1234)
      }), // ok
      call_center: yup.string().max(50, "Must be less than 50 characters").required("This field is requried"), // ok
      website: yup.string().url("Must be a url address").nullable(), // ok
      status: yup.number().integer().default(1).required("This field is requried"),
      postal_code: yup.string().max(12, "Must be less than 12 characters"), // ok
      tax_rate: yup.number().positive().required("This field is requried"), // ok
      version: yup.number().positive().integer().required("This field is requried"), // ok
      order_limit: yup.number().positive().integer().required("This field is requried"), // ok
      order_time_limit: yup.number().positive().integer().required("This field is requried"), // ok
      address: yup.string(), // ok
      second_address: yup.string(), // ok
      // delivery: yup.object({
      //   delivery_available: yup.boolean(), // ok
      //   delivery_max_distance: yup.number().positive().integer().default(1),
      //   delivery_min_amount: yup.number().positive().integer().default(50),
      //   delivery_fee: yup.number().positive().integer().default(3),
      //   delivery_percent: yup.number().positive().integer().default(10),
      //   delivery_km_amount: yup.number().integer().default(0),
      //   delivery_min_time: yup.number().positive().integer().default(30)
      // }),
      is_use_square: yup.boolean(), // ok
      square_location_id: yup.string(), // ok
      state: yup.string(), // ok
      // country: yup.string(), // ok
      // menu: yup.number().positive().integer()
    });

    const statusOptions = [
      { label: 'Inactive', value: 0 },
      { label: 'Active', value: 1 },
      { label: 'Unknown', value: 2 }
    ];

    const location = {
      lat: 35.1234,
      lon: -95.1234,
    };

    const weekTime = [
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
    ];

    const delivery = {
      delivery_available: false,
      delivery_max_distance: 1,
      delivery_min_amount: 50,
      delivery_fee: 3,
      delivery_percent: 10,
      delivery_km_amount: 0,
      delivery_min_time: 30
    };

    return {
      schema,
      isLoading: false,
      logoPath: '',
      statusOptions,
      weekTime,
      location,
      isSquareUsed: false,
      map: null,
      crs: CRS.EPSG4326,
      delivery,
      selectedStatus: 1,
      selectedCountry: 'United States',
      selectedCity: '',
      externalErrors: {}
    };
  },
  mounted() {
    this.map = L.map("map").setView(this.latLng(this.location), 7);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([this.location.lat, this.location.lon], {
      draggable: true
    }).on('moveend', this.changeLatLng).addTo(this.map);

  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    async submit(values) {
      const formData = new FormData()
      formData.append('logo', this.logoPath)

      const data = values
      data.week_time = this.weekTime
      data.country = this.selectedCountry
      data.city = this.selectedCity
      data.delivery = this.delivery
      data.cafe_timezone = 'America/New_York'

      console.log('data: ', data);
      console.log('formData: ', Object.fromEntries(formData));

      this.isLoading = true
      this.externalErrors = {}

      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

        const res = await cafePost({ ...data, ...formData });

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
          this.externalErrors = error.response.data;
        }
      } finally {
        this.isLoading = false
      }
    },
    invalidSubmit() {
      Toastify({
        node: cash('#failed-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
      }).showToast('asdjajsd sadlkasldkja');
    },
    toggleFunc1(e) {
      this.isSquareUsed = e.target.checked ? true : false;
    },
    toggleFunc2(e) {
      console.log('e in toggleFunc2: ', e.target.checked);
      this.delivery.delivery_available = e.target.checked ? true : false;
    },
    changeLatLng(e) {
      const targetLatLng = e.target.getLatLng()
      this.location.lat = targetLatLng.lat;
      this.location.lon = targetLatLng.lng;
      this.map.panTo([targetLatLng.lat, targetLatLng.lng])
    },

    latLng(obj) {
      return [obj.lat, obj.lon];
    },
  },
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
