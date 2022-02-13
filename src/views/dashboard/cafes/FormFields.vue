<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="md:basis-1/2 lg:basis-1/3">
      <div class="input-form">
        <div class="form-check w-auto">
          <input
            id="status"
            class="form-check-switch"
            type="checkbox"
            :value="formFields.status === 1 ? true : false"
            @change="formFields.status = $event.target.checked === true ? 1 : 0"
          />
          <label
            class="font-medium text-base ml-2 cursor-pointer"
            for="status"
          >Status</label>
        </div>
        <span
          class="text-theme-6 mt-2"
        >{{ externalErrors.status && externalErrors.status[0] }}</span>
      </div>
      <template v-if="formFields.status === 1">
        <div
          class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
        >
          <h2 class="font-medium text-base mr-auto">Cafe hours</h2>
        </div>
        <WeekDayTimeForm
          v-for="day, index in formFields.week_time"
          :key="day.day"
          :day="day"
          @update:opening_time="formFields.week_time[index]['opening_time'] = $event"
          @update:closing_time="formFields.week_time[index]['closing_time'] = $event"
          @update:is_open="formFields.week_time[index]['is_open'] = $event"
        />
        <span
          class="text-theme-6 mt-2"
        >{{ externalErrors.week_time && externalErrors.week_time[0] }}</span>
      </template>
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe location info</h2>
      </div>
      <div class="flex gap-5">
        <div class="input-form basis-1/2">
          <Field
            id="latitude"
            name="location.lat"
            v-model="formFields.location.lat"
            class="form-control"
            hidden
            type="number"
          />
        </div>
        <div class="input-form basis-1/2">
          <Field
            id="longitude"
            name="location.lon"
            v-model="formFields.location.lon"
            class="form-control"
            hidden
            type="number"
          />
        </div>
      </div>
      <div class="map_container">
        <!-- <div id="map"></div> -->
        <l-map id="map" v-model:zoom="zoomLevel" :center="currentLatLng">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>

          <l-marker :lat-lng="currentLatLng" draggable @moveend="changeLatLng" />
        </l-map>
      </div>
    </div>
    <div class="md:basis-1/2 lg:basis-2/3">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe info</h2>
      </div>
      <div class="flex gap-5 pt-3">
        <div class="input-form md:basis-1/2">
          <label class="form-label" for="name">
            Cafe name
            <span class="text-primary-3">*</span>
          </label>
          <Field
            id="name"
            name="name"
            class="form-control"
            v-model="formFields.name"
          />
          <ErrorMessage name="name" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.name && externalErrors.name[0] }}</span>
        </div>
        <div class="input-form md:basis-1/2">
          <label class="form-label" for="call_center">
            Phone number
            <span class="text-primary-3">*</span>
          </label>
          <Field
            id="call_center"
            name="call_center"
            class="form-control"
            v-model="formFields.call_center"
          />
          <ErrorMessage name="call_center" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.call_center && externalErrors.call_center[0] }}</span>
        </div>
      </div>
      <div class="flex pt-3">
        <div class="input-form md:basis-1/2 pr-2.5">
          <label class="form-label" for="website">Website</label>
          <Field
            id="website"
            name="website"
            class="form-control"
            v-model="formFields.website"
          />
          <ErrorMessage name="website" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.website && externalErrors.website[0] }}</span>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe addresses</h2>
      </div>
      <div class="flex">
        <div class="input-form md:basis-1/2 pr-2.5">
          <label for="country" class="form-label">Country</label>
          <CountrySelect v-model="formFields.country" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.country && externalErrors.country[0] }}</span>
        </div>
        <div
          class="input-form md:basis-1/2 pl-2.5"
          v-if="formFields.country === 'United States'"
        >
          <label class="form-label" for="state">State</label>
          <Field
            id="state"
            name="state"
            v-model="formFields.state"
            class="form-control"
            placeholder="Type state"
          />
          <ErrorMessage name="state" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.state && externalErrors.state[0] }}</span>
        </div>
      </div>
      <div class="flex gap-5 pt-3">
        <div class="input-form flex-1 md:basis-1/2">
          <label for="city" class="form-label">City</label>
          <CitySelect
            v-model="formFields.city"
            @change="searchLocationByAddress"
          />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.city && externalErrors.city[0] }}</span>
        </div>
        <div class="input-form md:basis-1/2">
          <label class="form-label" for="postal_code">Postal code</label>
          <Field
            id="postal_code"
            name="postal_code"
            class="form-control"
            placeholder="Type postal code"
            v-model="formFields.postal_code"
          />
          <ErrorMessage name="postal_code" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.postal_code && externalErrors.postal_code[0] }}</span>
        </div>
      </div>
      <div class="flex gap-5 pt-3">
        <div class="input-form md:basis-1/2">
          <label class="form-label" for="address">Address</label>
          <Field
            id="address"
            name="address"
            v-model="formFields.address"
            class="form-control"
            placeholder="Type address"
            @change="searchLocationByAddress"
          />
          <ErrorMessage name="address" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.address && externalErrors.address[0] }}</span>
        </div>
        <div class="input-form md:basis-1/2">
          <label class="form-label" for="second_address">Second address</label>
          <Field
            id="second_address"
            name="second_address"
            class="form-control"
            placeholder="Type second address"
            v-model="formFields.second_address"
          />
          <ErrorMessage name="second_address" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.second_address && externalErrors.second_address[0] }}</span>
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
          v-model="formFields.description"
        ></Field>
        <ErrorMessage name="description" class="text-theme-6 mt-2" />
        <span
          class="text-theme-6 mt-2"
        >{{ externalErrors.description && externalErrors.description[0] }}</span>
      </div>
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Operations</h2>
      </div>
      <div class="flex gap-5">
        <div class="input-form basis-1/2">
          <label for="tax_rate" class="form-label">
            Tax rate
            <span class="text-primary-3">*</span>
          </label>
          <Field
            id="tax_rate"
            name="tax_rate"
            v-model="formFields.tax_rate"
            class="form-control"
            type="number"
          />
          <ErrorMessage name="tax_rate" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.tax_rate && externalErrors.tax_rate[0] }}</span>
        </div>
        <div class="input-form basis-1/2">
          <label for="order_limit" class="form-label">
            Order limit
            <span class="text-primary-3">*</span>
          </label>
          <Field
            id="order_limit"
            name="order_limit"
            v-model="formFields.order_limit"
            class="form-control"
            type="number"
          />
          <ErrorMessage name="order_limit" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.order_limit && externalErrors.order_limit[0] }}</span>
        </div>
      </div>
      <div class="flex gap-5 pt-3">
        <div class="input-form basis-1/2">
          <label for="order_time_limit" class="form-label">
            Order time limit
            <span class="text-primary-3">*</span>
          </label>
          <Field
            id="order_time_limit"
            name="order_time_limit"
            v-model="formFields.order_time_limit"
            class="form-control"
            type="number"
          />
          <ErrorMessage name="order_time_limit" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.order_time_limit && externalErrors.order_time_limit[0] }}</span>
        </div>
        <div class="input-form basis-1/2">
          <label for="version" class="form-label">Version</label>
          <Field
            id="version"
            name="version"
            v-model="formFields.version"
            class="form-control"
            type="number"
          />
          <ErrorMessage name="version" class="text-theme-6 mt-2" />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.version && externalErrors.version[0] }}</span>
        </div>
      </div>
      <div class="flex gap-5 pt-3">
        <div class="form-check w-auto py-2">
          <input
            id="is_square_used"
            class="form-check-switch"
            type="checkbox"
            v-model="formFields.is_use_square"
          />
          <label class="form-check-label" for="is_square_used">Is square used</label>
        </div>
        <div class="input-form" v-if="formFields.is_use_square === true">
          <Field
            id="square_location_id"
            name="square_location_id"
            v-model="formFields.square_location_id"
            class="form-control"
            placeholder="Square location id"
          />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.square_location_id && externalErrors.square_location_id[0] }}</span>
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
            v-model="formFields.delivery_available"
          />
          <label
            class="form-check-label"
            for="delivery_available"
          >Delivery available</label>
        </div>
      </div>
      <template v-if="formFields.delivery_available">
        <div class="flex gap-5 pt-3">
          <div class="input-form basis-1/2">
            <label
              for="delivery_max_distance"
              class="form-label w-full flex flex-col sm:flex-row"
            >Delivery max distance</label>
            <input
              id="delivery_max_distance"
              v-model="formFields.delivery_max_distance"
              type="number"
              name="delivery_max_distance"
              class="form-control"
              placeholder="Type.."
            />
            <span
              class="text-theme-6 mt-2"
            >{{ externalErrors.delivery_max_distance && externalErrors.delivery_max_distance[0] }}</span>
          </div>
          <div class="input-form basis-1/2">
            <label
              for="delivery_min_amount"
              class="form-label w-full flex flex-col sm:flex-row"
            >Delivery min amount</label>
            <input
              id="delivery_min_amount"
              v-model="formFields.delivery_min_amount"
              type="number"
              step="0.001"
              name="delivery_min_amount"
              class="form-control"
              placeholder="Type.."
            />
            <span
              class="text-theme-6 mt-2"
            >{{ externalErrors.delivery_min_amount && externalErrors.delivery_min_amount[0] }}</span>
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
              v-model="formFields.delivery_fee"
              type="number"
              step="0.001"
              name="delivery_fee"
              class="form-control"
              placeholder="Type.."
            />
            <span
              class="text-theme-6 mt-2"
            >{{ externalErrors.delivery_fee && externalErrors.delivery_fee[0] }}</span>
          </div>
          <div class="input-form mt-3 basis-1/2">
            <label
              for="delivery_percent"
              class="form-label w-full flex flex-col sm:flex-row"
            >% of order fee</label>
            <input
              id="delivery_percent"
              v-model="formFields.delivery_percent"
              type="number"
              step="0.001"
              name="delivery_percent"
              class="form-control"
              placeholder="Type.."
            />
            <span
              class="text-theme-6 mt-2"
            >{{ externalErrors.delivery_percent && externalErrors.delivery_percent[0] }}</span>
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
              v-model="formFields.delivery_km_amount"
              type="number"
              name="delivery_km_amount"
              class="form-control"
              placeholder="Type.."
            />
            <span
              class="text-theme-6 mt-2"
            >{{ externalErrors.delivery_km_amount && externalErrors.delivery_km_amount[0] }}</span>
          </div>
          <div class="input-form mt-3 basis-1/2">
            <label
              for="delivery_min_time"
              class="form-label w-full flex flex-col sm:flex-row"
            >Delivery min time</label>
            <input
              id="delivery_min_time"
              v-model="formFields.delivery_min_time"
              type="number"
              name="delivery_min_time"
              class="form-control"
              placeholder="Type.."
            />
            <span
              class="text-theme-6 mt-2"
            >{{ externalErrors.delivery_min_time && externalErrors.delivery_min_time[0] }}</span>
          </div>
        </div>
      </template>
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe gallery</h2>
      </div>
      <MultipleImageUpload
        @update:image-files="formFields.upload_photos = $event"
        :obj-id="$route.params.id"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import axios from 'axios';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import MultipleImageUpload from './MultipleImageUpload.vue';

// leaflet styles
import 'leaflet/dist/leaflet.css';

const store = useStore();
const route = useRoute();
const router = useRouter();
const props = defineProps({
  formFields: {
    location: {
      lat: 35.1234,
      lon: -95.1234
    },
    delivery_available: false,
    delivery_max_distance: 1,
    delivery_min_amount: 50,
    delivery_fee: 3,
    delivery_percent: 10,
    delivery_km_amount: 0,
    delivery_min_time: 30,
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
    status: 0
  },
  externalErrors: {
    type: Object,
    default: () => { }
  }
});
const emit = defineEmits(['update:form-fields']);
const zoomLevel = ref(7);
const currentLatLng = computed(() => [
  props.formFields.location.lat || 35.1234,
  props.formFields.location.lon || -95.1234
]);

// onMounted(async () => {
//   store.commit('setLoadingStatus', true);
// })

function changeLatLng(e) {
  const targetLatLng = e.target.getLatLng();
  props.formFields.location.lat = targetLatLng.lat;
  props.formFields.location.lon = targetLatLng.lng;
}

function searchLocationByAddress() {
  const addr = `${props.formFields.country}, ${props.formFields.state}, ${props.formFields.city} city, ${props.formFields.address}`
  let url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${addr}`;
  axios.get(url).then(res => {
    if (res.data.length > 0) {
      props.formFields.location.lat = res.data[0].lat;
      props.formFields.location.lon = res.data[0].lon;
    }
  });
}

</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 300px !important;
}
</style>
