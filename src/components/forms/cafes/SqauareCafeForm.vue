<template>
  <form @submit.prevent="submit">
    <TomSelect v-model="locations" multiple>
      <option v-for="(item,index) in list" :key="index" :value="item.square_location_id">{{item.business_name}}</option>
    </TomSelect>
    <p class="text-theme-6">{{error?.data}}</p>
    <button type="submit" class="btn btn-success mt-2 w-full" :disabled="loading">Submit
      <LoadingIcon v-if="loading" icon="oval" color="white" class="w-4 h-4 ml-2" />
    </button>
  </form>
  <SuccessNotification message="Successfully shared"/>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SuccessNotification from '../../notifications/SuccessNotification.vue';
export default {
    data() {
        return {
            locations: null,
            list: [],
            loading: false,
            error: {}
        };
    },
    computed: {
        ...mapGetters(["cafes/getSquareCafeList"])
    },
    methods: {
        ...mapActions(["cafes/fetchSquareCafeList", "cafes/storeSquareCafe"]),
        ...mapMutations(["setSuccessNotification"]),
        async submit() {
            this.loading = true;
            const res = await this["cafes/storeSquareCafe"](this.locations);
            if (!res.status) {
                this.error = res.data;
            } else {
              this.setSuccessNotification();
            }
            this.loading = false;
        }
    },
    async mounted() {
        await this["cafes/fetchSquareCafeList"]();
        this.list = this["cafes/getSquareCafeList"];
    },
    components: { SuccessNotification }
}
// import { computed, onMounted, ref } from 'vue';
// import store from '@/store'
// const locations={};
// const getSquareCafeList = computed(()=>store.getters['cafes/getSquareCafeList']);
// onMounted(async () => {
//   await store.dispatch('cafes/fetchSquareCafeList');
// });
//   console.log(getSquareCafeList);
</script>