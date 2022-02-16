<template>
  <form
    @submit.prevent="submit"
    class="col-span-12 lg:col-span-8 2xl:col-span-9"
  >
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="company-name" class="form-label">
          Company Name
          <span class="text-theme-6">*</span>
        </label>
        <input
          id="company-name"
          type="text"
          class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Company Name"
          v-model="company.name"
          required
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="phone" class="form-label">Phone</label>
        <input
          id="phone"
          type="text"
          class="form-control"
          :class="getError('phone') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Phone"
          v-model="company.phone"
        />
        <div class="text-theme-6" v-text="getError('phone')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="company-email" class="form-label">Email</label>
        <input
          id="company-email"
          type="email"
          class="form-control"
          :class="getError('email') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Email"
          v-model="company.email"
        />
        <div class="text-theme-6" v-text="getError('email')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="website" class="form-label">Website</label>
        <input
          id="website"
          type="text"
          class="form-control"
          :class="getError('website') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="https://example.com"
          v-model="company.website"
        />
        <div class="text-theme-6" v-text="getError('website')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label class="form-label">Country</label>
        <CountrySelect
          :class="getError('country') != null ? 'border-theme-6' : 'border-gray-300'"
          v-model="company.country"
        />
        <div class="text-theme-6 mt-2" v-text="getError('country')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label class="form-label">City</label>
        <CitySelect
          :class="getError('city') != null ? 'border-theme-6' : 'border-gray-300'"
          v-model="company.city"
        />
        <div class="text-theme-6 mt-2" v-text="getError('city')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="address" class="form-label">Address</label>
        <input
          id="address"
          type="text"
          class="form-control"
          :class="getError('address') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Address"
          v-model="company.address"
        />
        <div class="text-theme-6" v-text="getError('address')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="second-address" class="form-label">Additional address line</label>
        <input
          id="second-address"
          type="text"
          class="form-control"
          :class="getError('second_address') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Second Address"
          v-model="company.second_address"
        />
        <div class="text-theme-6 mt-2" v-text="getError('second_address')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="postal-code" class="form-label">Postal Code</label>
        <input
          id="postal-code"
          type="number"
          class="form-control"
          :class="getError('postal_code') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Postal Code"
          v-model="company.postal_code"
        />
        <div class="text-theme-6" v-text="getError('postal_code')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="cashback" class="form-label">Cashback Percent</label>
        <div class="input-group">
          <div id="input-group-percent" class="input-group-text">%</div>
          <input
            id="cashback"
            type="number"
            class="form-control"
            :class="getError('cashback_percent') != null ? 'border-theme-6' : 'border-gray-300'"
            min="5"
            max="10"
            maxlength="2"
            placeholder="10"
            v-model="company.cashback_percent"
            aria-describedby="input-group-percent"
          />
        </div>
        <div class="text-theme-6 mt-2" v-text="getError('cashback_percent')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <div class="form-check w-full sm:w-auto mt-3 sm:mt-0">
          <input
            id="show-example-5"
            data-target="#select-options"
            class="show-code form-check-switch mr-3 ml-0"
            type="checkbox"
            v-model="company.pub_show_reviews"
          />
          <label for="show-example-5">Make customer reviews public</label>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <div class="form-check w-full sm:w-auto mt-3 sm:mt-0">
          <input
            id="show-example-6"
            data-target="#select-options"
            class="show-code form-check-switch mr-3 ml-0"
            type="checkbox"
            v-model="company.pub_show_like"
          />
          <label for="show-example-6">Make customer likes/dislikes public</label>
        </div>
      </div>
    </div>
    <div>
      <label for="about" class="form-label">About</label>
      <textarea
        id="about"
        type="text"
        class="form-control"
        :class="getError('about') != null ? 'border-theme-6' : 'border-gray-300'"
        placeholder="Describe your company"
        v-model="company.about"
      />
      <div class="text-theme-6" v-text="getError('about')" />
    </div>
    <div>
      <button
        type="submit"
        class="btn btn-primary py-3 px-4 block mx-auto mt-8 px-10 align-top"
        :disabled="isLoading"
      >
        {{ isLoading ? '' : 'Save' }}
        <LoadingIcon
          v-if="isLoading"
          icon="three-dots"
          color="white"
          class="w-8 h-8 my-2"
        />
      </button>
    </div>
  </form>
  <SuccessNotification ref="successNotification" :message="successMessage" />
  <ErrorNotification ref="errorNotification" />
</template>

<script>
import { defineComponent } from 'vue'
import CountrySelect from '../../components/selects/CountrySelect.vue'
import CitySelect from '../../components/selects/CitySelect.vue';
import { mapActions } from 'vuex';
import SuccessNotification from '../notifications/SuccessNotification.vue';
import ErrorNotification from '../notifications/ErrorNotification.vue';

export default defineComponent({
  data() {
    return {
      form: {},
      isLoading: false,
      errors: {},
      successMessage: 'Successfully saved!',
    }
  },
  props: {
    company: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.form = this.company;
  },
  methods: {
    ...mapActions(['putCompany', 'putStep']),
    async submit() {
      this.isLoading = true;
      const form = this.company;
      delete form.logo;
      delete form.loading_app_image;
      delete form.app_image_morning;
      delete form.app_image_evening;
      delete form.app_image_day;
      this.errors = {};
      const res = await this.putCompany(form);
      if (res.status) {
        this.errors = {};
        // const resp = await this.putStep(this.$store.state.user.STEP_CAFE)
        if (res.status) {
          this.$refs.successNotification.show()
          // this.$router.push('/entry/company')
        } else {
          this.$refs.errorNotification.show()
        }
        // this.$router.push('/entry/cafe')
      } else {
        this.errors = res.data;
      }
      this.isLoading = false
    },
    getError(key) {
      return this.errors[key]?.[0];
    }
  },
  components: { CountrySelect, CitySelect, SuccessNotification, ErrorNotification }
})
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit
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
input[type="number"] {
  -moz-appearance: textfield;
}
</style>