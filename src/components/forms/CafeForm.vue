<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import { useNotyf } from '@/composables/useNotyf';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import TelInput from './TelInput.vue';
import StateSelect from '../selects/StateSelect.vue';
import { storeCafe } from '@/api';
import SubmitButton from '../buttons/SubmitButton.vue';

const router = useRouter();
const notyf = useNotyf();
const form = reactive({
    week_time: [{ day: 'monday' }],
    cafe_timezone: 'Etc/GMT+12',
    location: {
      lat: 0,
      lon: 0,
    },
    country: '',
    call_center: '',
    phone_code: '',
    state: '',
    city: '',
    address: '',
    postal_code: '',
  }),
  isLoading = ref(false),
  errors = reactive({});

onMounted(async () => {
  await store.dispatch('fetchCompany');

  const { country, phone, state, city, postal_code, address } =
    store.getters['getCompany'];

  form.country = country;
  form.call_center = phone;
  form.state = state;
  form.city = city;
  form.postal_code = postal_code;
  form.address = address;
});

async function submit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});
    await storeCafe(form);
    await store.dispatch('putStep', store.state.user.STEP_FINISH);
    notyf.success();
    router.push('/entry/finish');
  } catch (error) {
    Object.assign(errors, error.response?.data);
    notyf.error('Error while updating step: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}

function getError(key) {
  return errors[key]?.[0];
}
</script>

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
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <div class="w-full md:w-1/2 px-3 md:mb-0">
        <label for="phone" class="form-label">
          Cafe phone number
          <!-- <span class="text-theme-6">*</span> -->
        </label>
        <TelInput
          v-model:phone-number="form.call_center"
          v-model:dial-code="form.phone_code"
        />
        <div class="text-theme-6" v-text="getError('call_center')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div
        class="w-full md:w-1/3 px-3 mb-3 md:mb-0"
        :class="form.country == 'US' ? 'md:w-1/2' : ''"
      >
        <label class="form-label">Country</label>
        <CountrySelect
          :class="getError('country') != null ? 'border-theme-6' : ''"
          v-model="form.country"
        />
        <div class="text-theme-6 mt-2" v-text="getError('country')" />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
        <label for="state" class="form-label">State</label>
        <StateSelect v-model="form.state" id="state" />
        <div class="text-theme-6" v-text="getError('state')" />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
        <label class="form-label">City</label>
        <CitySelect
          :class="getError('city') != null ? 'border-theme-6' : ''"
          v-model="form.city"
        />
        <div class="text-theme-6 mt-2" v-text="getError('city')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="postal_code" class="form-label">Postal Code</label>
        <input
          id="postal_code"
          type="text"
          class="form-control"
          :class="getError('postal_code') != null ? 'border-theme-6' : ''"
          placeholder="Postal Code"
          v-model="form.postal_code"
        />
        <div class="text-theme-6" v-text="getError('postal_code')" />
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
    <div class="text-center mt-10">
      <SubmitButton :is-loading="isLoading" text="Next" />
    </div>
  </form>
</template>

<style scoped>
/* Chrome, Saf
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.form-check-label {
  margin-left: 0;
}
</style>
