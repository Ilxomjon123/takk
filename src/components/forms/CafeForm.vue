<template>
  <form @submit.prevent="submit">
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="company-name" class="form-label">
          Name
          <span class="text-theme-6">*</span>
        </label>
        <input id="company-name" type="text" class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : ''" placeholder="Cafe Name" v-model="form.name"
          required />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="phone" class="form-label">
          Cafe phone number
          <!-- <span class="text-theme-6">*</span> -->
        </label>
        <!-- <input id="call_center" type="text" required class="form-control"
          :class="getError('call_center') != null ? 'border-theme-6' : ''" placeholder="Phone"
          v-model="form.call_center" /> -->
        <TelInput v-model="form.call_center" />
        <div class="text-theme-6" v-text="getError('call_center')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3 mb-3 md:mb-0" :class="form.country_code == 'US' ? 'md:w-1/2' : ''">
        <label class="form-label">Country</label>
        <CountrySelect :class="getError('country_code') != null ? 'border-theme-6' : ''" v-model="form.country_code" />
        <div class="text-theme-6 mt-2" v-text="getError('country_code')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="state" class="form-label">State</label>
        <StateSelect v-model="form.state" :country="form.country" id="state"
          :disabled="!(form.country === 'US' || form.country === 'United States')" />
        <div class="text-theme-6" v-text="getError('state')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label class="form-label">City</label>
        <CitySelect :class="getError('city') != null ? 'border-theme-6' : ''" v-model="form.city"
          :country="form.country" :state="form.state" />
        <div class="text-theme-6 mt-2" v-text="getError('city')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="address" class="form-label">Address</label>
        <input id="address" type="text" class="form-control"
          :class="getError('address') != null ? 'border-theme-6' : ''" placeholder="Address" v-model="form.address" />
        <div class="text-theme-6" v-text="getError('address')" />
      </div>
    </div>
    <div>
      <button type="submit" class="btn btn-primary px-4 block mx-auto mt-8 px-10 align-top" :disabled="isLoading">
        {{ isLoading ? '' : 'Submit' }}
        <LoadingIcon v-if="isLoading" icon="three-dots" color="white" class="w-8 h-8 my-2" />
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue'
import CountrySelect from '@/components/selects/CountrySelect.vue'
import CitySelect from '@/components/selects/CitySelect.vue';
import { mapActions } from 'vuex';
import TelInput from './TelInput.vue';
import StateSelect from '../selects/StateSelect.vue';

export default defineComponent({
  data() {
    return {
      form: {
        week_time: [{ day: "monday" }],
        cafe_timezone: "Etc/GMT+12",
        location: {
          lat: 0,
          lon: 0
        },
        country_code: this.$store.getters['getCompany'].country_code || "US",
        call_center: this.$store.getters['getCompany'].phone,
        state: this.$store.getters['getCompany'].state,
        city: this.$store.getters['getCompany'].city,
        address: this.$store.getters['getCompany'].address
      },
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    ...mapActions(['postCafe', 'putStep']),
    async submit() {
      this.isLoading = true;
      this.errors = {};
      const res = await this.postCafe(this.form);

      if (res.status) {
        this.errors = {};
        const resp = await this.putStep(this.$store.state.user.STEP_FINISH)
        if (resp.status) {
          this.$router.push('/entry/finish')
        } else {
          this.$refs.errorNotification.show()
        }
      } else {
        this.errors = res.data;
      }
      this.isLoading = false
    },
    getError(key) {
      return this.errors[key]?.[0];
    }
  },
  components: { CountrySelect, CitySelect, TelInput, StateSelect }
});
</script>

<style scoped>
/* Chrome, Saf
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.form-check-label {
  margin-left: 0;
}
</style>
