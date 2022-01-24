<template>
  <div class="flex flex-col">
    <div class="my-5 border-b border-gray-200 dark:border-dark-5">
      <h2 class="font-medium text-base">Cafe location</h2>
    </div>
    <div class="flex gap-5">
      <div class="basis-1/2 input-form mt-3">
        <label
          for="lat"
          class="form-label w-full flex flex-col sm:flex-row"
        >Latitude</label>
        <input
          id="lat"
          v-model="location.lat"
          @input="$emit('update:modelValue', $event.target.value)"
          type="number"
          step="0.000000000000001"
          name="lat"
          class="form-control"
          :class="{ 'border-theme-6': latError }"
        />
        <template v-if="latError">
          <div
            v-for="(error, index) in latErrors"
            :key="index"
            class="text-theme-6 mt-2"
          >{{ error.$message }}</div>
        </template>
      </div>
      <div class="basis-1/2 input-form mt-3">
        <label
          for="lon"
          class="form-label w-full flex flex-col sm:flex-row"
        >Longitude</label>
        <input
          id="lon"
          v-model="location.lon"
          @input="$emit('update:modelValue', $event.target.value)"
          type="number"
          step="0.000000000000001"
          name="lon"
          class="form-control"
          :class="{ 'border-theme-6': lonError }"
        />
        <template v-if="lonError">
          <div
            v-for="(error, index) in lonErrors"
            :key="index"
            class="text-theme-6 mt-2"
          >{{ error.$message }}</div>
        </template>
      </div>
    </div>
    <div class="mt-5 map_container">
      <LMap ref="map" v-model:zoom="zoom" :center="mapCenter">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></LTileLayer>

        <LMarker
          :lat-lng="[location.lat, location.lon]"
          draggable
          @moveend="changeLatLong"
        >
          <!-- <LPopup>
            lol
          </LPopup>-->
        </LMarker>
      </LMap>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue-demi';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

const zoom = ref(10);
const props = defineProps({
  location: {
    lat: null,
    lon: null
  },
  latError: '',
  latErrors: [],
  lonError: '',
  lonErrors: [],
});

const mapCenter = reactive([props.location.lat, props.location.lon]);

function changeLatLong(e) {
  props.location.lat = e.target.getLatLng().lat;
  props.location.lon = e.target.getLatLng().lng;
}

</script>

<style lang="scss" scoped>
.map_container {
  width: 100%;
  height: 400px;
}
</style>
