<template>
  <form @submit.prevent="submit">
    <label class="form-label">Select Cafe</label>
    <TomSelect v-model="locations" multiple>
      <option v-for="(item,index) in list" :key="index" :value="item.square_location_id">{{item.business_name}}</option>
    </TomSelect>
    <p class="text-theme-6">{{error?.data}}</p>
    <button type="submit" class="btn btn-success mt-2" :disabled="loading">Integrate
      <LoadingIcon v-if="loading" icon="oval" color="white" class="w-4 h-4 ml-2" />
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      locations: [],
      list: [],
      loading: false,
      error: {}
    };
  },
  computed: {
    ...mapGetters(["cafes/getSquareCafeList", "cafes/getSquareSelectedCafeList"])
  },
  methods: {
    ...mapActions(["cafes/fetchSquareCafeList", "cafes/storeSquareCafe", "cafes/fetchCafeList"]),
    ...mapMutations(["setSuccessNotification"]),
    async submit() {
      this.loading = true;
      this.error= {};
      const res = await this["cafes/storeSquareCafe"](this.locations);
      if (!res.status) {
        this.error = res.data;
      } else {
        this.setSuccessNotification();
      }
      this.loading = false;
    }
  },
  // async mounted() {
  //   await this["cafes/fetchCafeList"]();
  //   await this["cafes/fetchSquareCafeList"]();
  //   this.locations = this["cafes/getSquareSelectedCafeList"].map(item => item.square_location_id);
  //   // console.log('loctions',this["cafes/getSquareSelectedCafeList"]);
  //   this.list = this["cafes/getSquareCafeList"];
  // },
}
</script>