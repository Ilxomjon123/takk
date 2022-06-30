<template>
  <div class="text-center mb-2 -mt-3 text-xs text-gray-500">To send Notification to Square switch on switcher</div>
  <div class="form-check" v-for="(item, index) in cafes" :key="index">
    <input
      :id="'toggle' + index"
      class="form-check-switch"
      type="checkbox"
      :checked="item.square_notifications"
      @change="$event => change(item)"
    />
    <label
      class="form-check-label text-base cursor-pointer"
      :for="'toggle' + index"
      v-text="item.name"
    />
    <router-link :to="'/dashboard/cafes/' + item.id">
      <ExternalLinkIcon class="ml-2 hover:text-theme-1 cursor-pointer" />
    </router-link>
  </div>
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
    ...mapGetters(["cafes/getSquareSelectedCafeList"]),
    cafes(){
      return this["cafes/getSquareSelectedCafeList"];
    }
  },
  methods: {
    ...mapActions(["cafes/fetchCafeList","cafes/squareCafeNotification"]),
    change(item){
      this["cafes/squareCafeNotification"](item.id);
      item.square_notifications = !item.square_notifications;
    }
  },
  created(){
    this["cafes/fetchCafeList"]();
  }
}
</script>