<template>
  <form @submit.prevent="submit">
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="company-name" class="form-label">
          Name
          <span class="text-theme-6">*</span>
        </label>
        <input
          id="company-name"
          type="text"
          class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : ''"
          placeholder="Cafe Name"
          v-model="form.name"
          required
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="call_center" class="form-label">
          Phone
          <span class="text-theme-6">*</span>
        </label>
        <input
          id="call_center"
          type="text"
          required
          class="form-control"
          :class="getError('call_center') != null ? 'border-theme-6' : ''"
          placeholder="Phone"
          v-model="form.call_center"
        />
        <div class="text-theme-6" v-text="getError('call_center')" />
      </div>
    </div>
    <!-- <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="company-email" class="form-label">Email</label>
        <input
          id="company-email"
          type="email"
          class="form-control"
          :class="getError('email') != null ? 'border-theme-6' : ''"
          placeholder="Email"
          v-model="form.email"
        />
        <div class="text-theme-6" v-text="getError('email')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="website" class="form-label">Website</label>
        <input
          id="website"
          type="text"
          class="form-control"
          :class="getError('website') != null ? 'border-theme-6' : ''"
          placeholder="https://example.com"
          v-model="form.website"
        />
        <div class="text-theme-6" v-text="getError('website')" />
      </div>
    </div>-->
    <div class="flex flex-wrap -mx-3 mb-3">
      <div
        class="w-full px-3 mb-3 md:mb-0"
        :class="form.country == 'United States' ? 'md:w-1/2' : ''"
      >
        <label class="form-label">Country</label>
        <CountrySelect
          :class="getError('country') != null ? 'border-theme-6' : ''"
          v-model="form.country"
        />
        <div class="text-theme-6 mt-2" v-text="getError('country')" />
      </div>
      <div
        class="w-full md:w-1/2 px-3 mb-3 md:mb-0"
        v-if="form.country == 'United States'"
      >
        <label for="state" class="form-label">State</label>
        <input
          id="state"
          type="text"
          class="form-control"
          :class="getError('state') != null ? 'border-theme-6' : ''"
          placeholder="State"
          v-model="form.state"
        />
        <div class="text-theme-6" v-text="getError('state')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label class="form-label">City</label>
        <CitySelect
          :class="getError('city') != null ? 'border-theme-6' : ''"
          v-model="form.city"
        />
        <div class="text-theme-6 mt-2" v-text="getError('city')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="address" class="form-label">Address</label>
        <input
          id="address"
          type="text"
          class="form-control"
          :class="getError('address') != null ? 'border-theme-6' : ''"
          placeholder="Address"
          v-model="form.address"
        />
        <div class="text-theme-6" v-text="getError('address')" />
      </div>
    </div>
    <!-- <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="postal-code" class="form-label">Postal Code</label>
        <input
          id="postal-code"
          type="number"
          class="form-control"
          :class="getError('postal_code') != null ? 'border-theme-6' : ''"
          placeholder="Postal Code"
          v-model="form.postal_code"
        />
        <div class="text-theme-6" v-text="getError('postal_code')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="second-address" class="form-label">Second Address</label>
        <input
          id="second-address"
          type="text"
          class="form-control"
          :class="getError('second_address') != null ? 'border-theme-6' : ''"
          placeholder="Second Address"
          v-model="form.second_address"
        />
        <div class="text-theme-6 mt-2" v-text="getError('second_address')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="order-limit" class="form-label">Order Limit</label>
        <input
          id="order-limit"
          type="number"
          class="form-control"
          :class="getError('order_limit') != null ? 'border-theme-6' : ''"
          placeholder="Order Limit"
          v-model="form.order_limit"
        />
        <div class="text-theme-6" v-text="getError('order_limit')" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="order-time-limit" class="form-label">Order Time Limit</label>
        <input
          id="order-time-limit"
          type="text"
          class="form-control"
          :class="getError('order_time_limit') != null ? 'border-theme-6' : ''"
          placeholder="Order Time Limit"
          v-model="form.order_time_limit"
        />
        <div class="text-theme-6 mt-2" v-text="getError('order_time_limit')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <div class="form-check w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0">
          <label
            class="form-check-label"
            for="show-example-5"
          >Delivery Available</label>
          <input
            id="show-example-5"
            data-target="#select-options"
            class="show-code form-check-switch mr-0 ml-3"
            type="checkbox"
            v-model="form.delivery_available"
          />
        </div>
      </div>
    </div>
    <div v-if="form.delivery_available">
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <label
            for="delivery-min-amount"
            class="form-label"
          >Delivery Minimal Amount</label>
          <div class="input-group">
            <div id="input-group-min-amount" class="input-group-text">$</div>
            <input
              id="delivery-min-amount"
              type="number"
              class="form-control"
              :class="getError('delivery_min_amount') != null ? 'border-theme-6' : ''"
              placeholder="10"
              v-model="form.delivery_min_amount"
              aria-describedby="input-group-min-amount"
            />
          </div>
          <div class="text-theme-6" v-text="getError('delivery_min_amount')" />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <label for="delivery-fee" class="form-label">Delivery Fee</label>
          <input
            id="delivery-fee"
            type="text"
            class="form-control"
            :class="getError('delivery_fee') != null ? 'border-theme-6' : ''"
            placeholder="Delivery Fee"
            v-model="form.delivery_fee"
          />
          <div class="text-theme-6 mt-2" v-text="getError('delivery_fee')" />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <label for="delivery-percent" class="form-label">Delivery Percent</label>
          <div class="input-group">
            <div id="input-group-percent" class="input-group-text">%</div>
            <input
              id="delivery-percent"
              type="number"
              class="form-control"
              :class="getError('delivery_percent') != null ? 'border-theme-6' : ''"
              placeholder="10"
              v-model="form.delivery_percent"
              aria-describedby="input-group-percent"
            />
          </div>
          <div class="text-theme-6 mt-2" v-text="getError('delivery_percent')" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <label for="order-limit" class="form-label">Maximum Delivery Distance</label>
          <div class="input-group">
            <div id="input-group-max-distance" class="input-group-text">km</div>
            <input
              id="order-limit"
              type="number"
              class="form-control"
              :class="getError('delivery_max_distance') != null ? 'border-theme-6' : ''"
              placeholder="10"
              v-model="form.delivery_max_distance"
              aria-describedby="input-group-max-distance"
            />
          </div>
          <div class="text-theme-6" v-text="getError('delivery_max_distance')" />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <label
            for="order-time-limit"
            class="form-label"
          >Delivery Amount for per km</label>
          <div class="input-group">
            <div id="input-group-per-km" class="input-group-text">$</div>
            <input
              id="order-time-limit"
              type="text"
              class="form-control"
              :class="getError('delivery_km_amount') != null ? 'border-theme-6' : ''"
              placeholder="2"
              v-model="form.delivery_km_amount"
              aria-describedby="input-group-max-distance"
            />
          </div>
          <div
            class="text-theme-6 mt-2"
            v-text="getError('delivery_km_amount')"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <label
            for="delivery-min-time"
            class="form-label"
          >Minimal Delivery Time</label>
          <input
            id="delivery-min-time"
            type="text"
            class="form-control"
            :class="getError('delivery_min_time') != null ? 'border-theme-6' : ''"
            placeholder="30"
            v-model="form.delivery_min_time"
          />
          <div
            class="text-theme-6 mt-2"
            v-text="getError('delivery_min_time')"
          />
        </div>
      </div>
    </div>
    <div>
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        type="text"
        class="form-control"
        :class="getError('description') != null ? 'border-theme-6' : ''"
        placeholder="Describe your cafe..."
        v-model="form.description"
      />
      <div class="text-theme-6" v-text="getError('description')" />
    </div>-->
    <div>
      <button
        type="submit"
        class="btn btn-primary px-4 block mx-auto mt-8 px-10 align-top"
        :disabled="isLoading"
      >
        {{ isLoading ? '' : 'Submit' }}
        <LoadingIcon
          v-if="isLoading"
          icon="three-dots"
          color="white"
          class="w-8 h-8 my-2"
        />
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue'
import CountrySelect from '../../components/selects/CountrySelect.vue'
import CitySelect from '../../components/selects/CitySelect.vue';
import { mapActions } from 'vuex';

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
        country: "United States"
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
  components: { CountrySelect, CitySelect }
})
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