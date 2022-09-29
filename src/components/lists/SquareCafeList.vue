<template>
  <div class="flex align-middle">
    <button
      class="btn btn-primary btn-sm text-sm"
      @click="synchSquare"
      :disabled="loading"
    >
      <LoadingIcon icon="oval" v-if="loading" />
      <RotateCwIcon v-else />
    </button>
    <div class="form-check-label text-base mt-2">Refresh Square Data</div>
  </div>
  <div class="my-3 font-medim text-base">
    Send order notifications to Square system:
  </div>
  <div class="form-check" v-for="(item, index) in cafes" :key="index">
    <input
      :id="'toggle' + index"
      class="form-check-switch"
      type="checkbox"
      :checked="item.square_notifications"
      @change="($event) => change(item)"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { syncSquare } from '@/api';

export default {
  data() {
    return {
      locations: [],
      list: [],
      loading: false,
      error: {},
    };
  },
  computed: {
    ...mapGetters(['cafes/getSquareSelectedCafeList']),
    cafes() {
      return this['cafes/getSquareSelectedCafeList'];
    },
  },
  methods: {
    ...mapActions(['cafes/fetchCafeList', 'cafes/squareCafeNotification']),
    change(item) {
      this['cafes/squareCafeNotification'](item.id);
      item.square_notifications = !item.square_notifications;
    },
    async synchSquare() {
      this.loading = true;
      await syncSquare();
      this.loading = false;
    },
  },
  created() {
    this['cafes/fetchCafeList']();
  },
};
</script>
