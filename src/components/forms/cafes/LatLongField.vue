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
        />
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
        />
      </div>
    </div>
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
  },
  emits: ['update:latitude-value', 'update:longitude-value'],
  data: () => ({
    map: null,
    mapCenter: []
  }),
  computed: {
    setMapCenter() {
      return this.mapCenter
    }
  },
  async mounted() {
    this.mapCenter = this.latLng(this.location);
    this.map = await L.map("map").setView(this.setMapCenter, 7);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([this.location.lat, this.location.lon], {
      draggable: true
    }).on('moveend', this.changeLatLng).addTo(this.map);

  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    changeLatLng(e) {
      console.log('in changeLatLng func: ', e);
      const targetLatLng = e.target.getLatLng()
      this.$emit('update:latitude-value', targetLatLng.lat);
      this.$emit('update:longitude-value', targetLatLng.lng);
      this.location.lat = targetLatLng.lat;
      this.location.lon = targetLatLng.lng;
      this.map.panTo([targetLatLng.lat, targetLatLng.lng])
    },

    latLng(obj) {
      return [obj.lat, obj.lon];
    },
  }
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
