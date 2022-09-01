<script setup>
import { ref } from 'vue';
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet';
import axios from 'axios';

import CountrySelect from '@/components/selects/CountrySelect.vue';
import StateSelect from '@/components/selects/StateSelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import TelInput from '@/components/forms/TelInput.vue';
import InputField from './InputField.vue';
import useCountries from '@/features/useCountries';

// leaflet styles
import 'leaflet/dist/leaflet.css';

const props = defineProps({
  formData: {
    type: Object,
    default: () => {}
  },
  externalErrors: {
    type: Object,
    default: () => {}
  },
  isLoading: false
});

const emit = defineEmits(['update:formData']);

const openstreetMapUrl = ref(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
const zoomLevel = ref(7);
const { countriesList, statesList, citiesList } = useCountries();

function changeLatLng(e) {
  const targetLatLng = e.target.getLatLng();
  props.formData.location.coordinates[1] = targetLatLng.lat;
  props.formData.location.coordinates[0] = targetLatLng.lng;
}

async function submit() {
  emit('update:formData', props.formData);
}

function searchLocationByAddress() {
  const countryName = countriesList.value?.find(
    country => country.id == props.formData.country
  )?.name;
  const stateName = statesList.value?.find(
    state => state.id == props.formData.state
  )?.name;
  const cityName = citiesList.value?.find(
    city => city.id == props.formData.city
  )?.name;

  const addr = `${countryName}, ${stateName}, ${cityName}, ${props.formData.postal_code}, ${props.formData.address}`;
  let url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${addr}`;
  axios.get(url).then(res => {
    if (res.data.length > 0) {
      props.formData.location.coordinates[1] = Number(res.data[0]?.lat);
      props.formData.location.coordinates[0] = Number(res.data[0]?.lon);
    }
  });
}
</script>

<template>
  <div class="intro-y box lg:mt-5">
    <div
      class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-base mr-auto">Cafe Information</h2>
    </div>
    <form class="p-5" @submit.prevent="submit">
      <div class="flex xl:flex-row flex-col">
        <div class="flex-1 mt-6 xl:mt-0">
          <div class="grid grid-cols-12 gap-x-5">
            <div class="col-span-12 2xl:col-span-6">
              <InputField
                v-model="formData.name"
                title="Cafe name"
                id-value="cafe-form-name"
                :error="externalErrors.name && externalErrors.name[0]"
                :is-required="true"
              />
              <InputField
                v-model="formData.website"
                title="Cafe website"
                id-value="cafe-form-website"
                :error="externalErrors.website && externalErrors.website[0]"
                class="mt-3"
              />
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <label for="phone" class="form-label">Cafe phone number</label>
              <TelInput
                v-model:phone-number="formData.call_center"
                v-model:dial-code="formData.phone_code"
              />
              <div
                class="text-theme-6"
                v-text="
                  externalErrors.call_center && externalErrors.call_center[0]
                "
              />
            </div>
            <div class="col-span-12 2xl:col-span-12">
              <div class="grid grid-cols-1 2xl:grid-cols-2 gap-x-5">
                <div class="mt-3">
                  <label for="cafe-form-country" class="form-label"
                    >Country</label
                  >
                  <CountrySelect
                    id="cafe-form-country"
                    v-model="formData.country"
                  />
                  <span class="text-theme-6 mt-2">{{
                    externalErrors.country && externalErrors.country[0]
                  }}</span>
                </div>
                <div class="mt-3">
                  <label class="form-label" for="cafe-form-state">State</label>
                  <StateSelect v-model="formData.state" id="cafe-form-state" />
                  <span class="text-theme-6 mt-2">{{
                    externalErrors.state && externalErrors.state[0]
                  }}</span>
                </div>
              </div>
            </div>
            <div class="col-span-12 2xl:col-span-12">
              <div class="grid grid-cols-1 2xl:grid-cols-2 gap-x-5">
                <div class="mt-3">
                  <label for="cafe-form-city" class="form-label">City</label>
                  <CitySelect
                    id="cafe-form-city"
                    v-model="formData.city"
                    @change="searchLocationByAddress"
                  />
                  <span class="text-theme-6 mt-2">{{
                    externalErrors.city && externalErrors.city[0]
                  }}</span>
                </div>
                <InputField
                  v-model="formData.postal_code"
                  title="Postal code"
                  id-value="cafe-form-postal_code"
                  :error="
                    externalErrors.postal_code && externalErrors.postal_code[0]
                  "
                  @change="searchLocationByAddress"
                  class="mt-3"
                />
              </div>
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <InputField
                v-model="formData.address"
                title="Address"
                id-value="cafe-form-address"
                :error="externalErrors.address && externalErrors.address[0]"
                @change="searchLocationByAddress"
                class="mt-3"
              />
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <InputField
                v-model="formData.second_address"
                title="Additional address line"
                id-value="cafe-form-second_address"
                :error="
                  externalErrors.second_address &&
                    externalErrors.second_address[0]
                "
                class="mt-3"
              />
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <div class="mt-3">
                <label for="cafe-form-5" class="form-label">Description</label>
                <textarea
                  id="cafe-form-5"
                  v-model="formData.description"
                  rows="9"
                  class="form-control"
                  placeholder="Type cafe description"
                ></textarea>
                <span class="text-theme-6 mt-2">{{
                  externalErrors.description && externalErrors.description[0]
                }}</span>
              </div>
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <div class="map_container mt-3">
                <label for="cafe-form-5" class="form-label">Location</label>
                <l-map
                  id="map"
                  v-model:zoom="zoomLevel"
                  :center="[
                    formData.location.coordinates[1],
                    formData.location.coordinates[0]
                  ]"
                >
                  <l-tile-layer
                    :url="openstreetMapUrl"
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                  <l-marker
                    :lat-lng="[
                      formData.location.coordinates[1],
                      formData.location.coordinates[0]
                    ]"
                    draggable
                    @moveend="changeLatLng"
                  />
                </l-map>
              </div>
            </div>
          </div>
          <div class="flex">
            <button
              type="submit"
              class="btn btn-primary mt-3 ml-auto"
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
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
#map {
  width: 100%;
  height: 200px !important;
  // @apply md: h-80;
}

.ts-input {
  z-index: inherit !important;
}

.dark {
  .vti__input,
  .vti__dropdown {
    border-radius: 0.375rem;
  }

  .vti__dropdown:hover,
  .vti__dropdown.disabled,
  .vti__dropdown.open {
    background-color: rgb(41, 49, 69) !important;
  }
}
</style>
