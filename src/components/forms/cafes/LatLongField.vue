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
          :value="location.lat"
          @input="$emit('update:latitude-value', $event.target.value)"
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
          :value="location.lon"
          @input="$emit('update:longitude-value', $event.target.value)"
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
    <template v-if="locationErrors">
      <div
        v-for="(error, index) in locationErrors"
        :key="index"
        class="text-theme-6 mt-2"
      >{{ error }}</div>
    </template>
    <div class="mt-5 map_container">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

export default defineComponent({
  props: {
    location: Object,
    latError: Boolean,
    latErrors: Array,
    lonError: Boolean,
    lonErrors: Array,
    locationErrors: Array,
  },
  data: () => ({
    map: null,
    mapCenter: []
  }),
  computed: {
    setMapCenter() {
      return this.mapCenter
    }
  },
  mounted() {
    this.mapCenter = this.latLng(this.location)
    this.map = L.map("map").setView(this.setMapCenter, 7);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([this.location.lat, this.location.lon], {
      draggable: true
    }).on('moveend', this.changeLatLong).addTo(this.map);

  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    changeLatLong(e) {
      console.log('in changeLatLong func: ', e);
      const targetLatLng = e.target.getLatLng()
      this.location.lat = targetLatLng.lat;
      this.location.lon = targetLatLng.lng;
      this.map.panTo([targetLatLng.lat, targetLatLng.lng])
    },

    latLng(obj) {
      return [obj.lat, obj.lon];
    },

    onMapReady() {
      console.log('marker location on map ready: ', this.location);
      this.mapCenter = this.latLng(this.location)
    }
  }
})


</script>

<style lang="scss" scoped>
#map {
  width: 50%;
  height: 400px;
}
</style>
