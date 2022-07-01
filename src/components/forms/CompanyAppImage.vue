<template>
  <form @submit.prevent="submit">
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
        <label for="company-name" class="form-label">
          Company Name
          <span class="text-theme-6">*</span>
        </label>
        <input id="company-name" type="text" class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Company Name"
          v-model="form.name" required />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <div class="w-full md:w-1/3 px-3 md:mb-0">
        <label for="phone" class="form-label">Phone</label>
        <!-- <input id="phone" type="text" class="form-control"
          :class="getError('phone') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Phone"
          v-model="form.phone" /> -->
        <!-- <vue-tel-input styleClasses="intro-x login__input border-gray-200 block py-1" v-model="form.phone" /> -->
        <TelInput v-model="form.phone" />
        <div class="text-theme-6" v-text="getError('phone')" />
      </div>
      <div class="w-full md:w-1/3 px-3 md:mb-0">
        <label for="company-email" class="form-label">Email</label>
        <input id="company-email" type="email" class="form-control"
          :class="getError('email') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Email"
          v-model="form.email" />
        <div class="text-theme-6" v-text="getError('email')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-1">
      <div class="w-full px-3 md:mb-0" :class="{
        'md:w-1/2': !isUnitedStates,
        'md:w-1/3': isUnitedStates
      }">
        <label class="form-label">Country</label>
        <CountrySelect :class="getError('country') != null ? 'border-theme-6' : 'border-gray-300'"
          v-model="form.country" />
        <div class="text-theme-6 mt-2" v-text="getError('country')" />
      </div>
      <div class="w-full px-3 mb-3 md:w-1/3 md:mb-0" v-if="isUnitedStates">
        <label for="state" class="form-label">State</label>
        <StateSelect v-model="form.state" id="state" />

        <div class="text-theme-6" v-text="getError('state')" />
      </div>
      <div class="w-full px-3 md:mb-0" :class="{
        'md:w-1/2': !isUnitedStates,
        'md:w-1/3': isUnitedStates
      }">
        <label class="form-label">City</label>
        <CitySelect :class="getError('city') != null ? 'border-theme-6' : 'border-gray-300'" v-model="form.city" />
        <div class="text-theme-6 mt-2" v-text="getError('city')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="postal-code" class="form-label">Postal Code</label>
        <input id="postal-code" class="form-control"
          :class="getError('postal_code') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Postal Code"
          v-model="form.postal_code" />
        <div class="text-theme-6" v-text="getError('postal_code')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="address" class="form-label">Address</label>
        <input id="address" type="text" class="form-control"
          :class="getError('address') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Address"
          v-model="form.address" />
        <div class="text-theme-6" v-text="getError('address')" />
      </div>
    </div>
    <div class="text-theme-6 text-center" v-text="errors['detail']" />
    <div>
      <button type="submit" class="btn btn-primary px-4 block mx-auto mt-8 px-10 align-top" :disabled="isLoading">
        {{ isLoading ? '' : 'Next' }}
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
import StateSelect from '../selects/StateSelect.vue';
import TelInput from './TelInput.vue';

export default defineComponent({
  data() {
    return {
      form: {
        country_code: "US",
        phone: this.$store.getters['getUser'].phone,
        email: this.$store.getters['getUser'].email
      },
      isLoading: false,
      errors: {}
    }
  },
  computed: {
    isUnitedStates() {
      return this.form.country_code == 'US';
    }
  },
  methods: {
    ...mapActions(['postCompany', 'putStep']),
    async submit() {
      this.isLoading = true;
      this.errors = {};
      const res = await this.postCompany(this.form);
      if (res.status) {
        this.goCafe();
      } else {
        if (res.data?.detail == "You already have a company") this.goCafe();
        else this.errors = res.data;
      }
      this.isLoading = false
    },
    getError(key) {
      return this.errors[key]?.[0];
    },
    async goCafe() {
      this.errors = {};
      const resp = await this.putStep(this.$store.state.user.STEP_CAFE)
      if (resp.status) {
        this.$router.push('/entry/cafe')
      } else {
        this.$refs.errorNotification.show()
      }
    }
  },
  components: { CountrySelect, CitySelect, StateSelect, TelInput }
});
</script>

<style scoped>
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
</style>
