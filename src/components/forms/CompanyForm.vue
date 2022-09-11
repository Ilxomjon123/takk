<script setup>
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import StateSelect from '../selects/StateSelect.vue';
import TelInput from './TelInput.vue';
import { computed, reactive, ref } from 'vue';
import store from '@/store';
import router from '@/router';
import { useNotyf } from '@/composables/useNotyf';
import { storeCompany } from '@/api';
import SubmitButton from '../buttons/SubmitButton.vue';

const user = computed(() => store.getters['getUser']);
const notyf = useNotyf();
const form = reactive({
  email: user.value.email,
  phone: user.value.phone,
  phone_code: user.value.phone_code,
  country: '236',
  country_code: 'US',
  cashback_persent: 10,
  name: '',
});
const errors = reactive({});
const isLoading = ref(false);

async function submit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const res = await storeCompany(form);

    if (res.data?.detail == 'You already have a company') {
      notyf.info(res.data?.detail);
      router.push('/entry/cafe');
    }

    await store.dispatch('putStep', user.value.STEP_CAFE);
    notyf.success();
    router.push('/entry/cafe');
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
      <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
        <label for="company-name" class="form-label">
          Company Name
          <span class="text-theme-6">*</span>
        </label>
        <input
          id="company-name"
          type="text"
          class="form-control"
          :class="
            getError('name') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Company Name"
          v-model="form.name"
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <div class="w-full md:w-1/3 px-3 md:mb-0">
        <label for="phone" class="form-label">Phone</label>
        <TelInput
          v-model:phone-number="form.phone"
          v-model:dial-code="form.phone_code"
        />
        <div class="text-theme-6" v-text="getError('phone')" />
      </div>
      <div class="w-full md:w-1/3 px-3 md:mb-0">
        <label for="company-email" class="form-label">Email</label>
        <input
          id="company-email"
          type="email"
          class="form-control"
          :class="
            getError('email') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Email"
          v-model="form.email"
        />
        <div class="text-theme-6" v-text="getError('email')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-1">
      <div class="w-full px-3 md:mb-0 md:w-1/3">
        <label class="form-label">Country</label>
        <CountrySelect
          :class="
            getError('country') != null ? 'border-theme-6' : 'border-gray-300'
          "
          v-model="form.country"
        />
        <div class="text-theme-6 mt-2" v-text="getError('country')" />
      </div>
      <div class="w-full px-3 mb-3 md:w-1/3 md:mb-0">
        <label for="state" class="form-label">State</label>
        <StateSelect v-model="form.state" id="state" />
        <div class="text-theme-6" v-text="getError('state')" />
      </div>
      <div class="w-full px-3 md:mb-0 md:w-1/3">
        <label class="form-label">City</label>
        <CitySelect
          :class="
            getError('city') != null ? 'border-theme-6' : 'border-gray-300'
          "
          v-model="form.city"
        />
        <div class="text-theme-6 mt-2" v-text="getError('city')" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label for="postal-code" class="form-label">Postal Code</label>
        <input
          id="postal-code"
          class="form-control"
          :class="
            getError('postal_code') != null
              ? 'border-theme-6'
              : 'border-gray-300'
          "
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
          :class="
            getError('address') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Address"
          v-model="form.address"
        />
        <div class="text-theme-6" v-text="getError('address')" />
      </div>
    </div>
    <div class="text-theme-6 text-center" v-text="errors['detail']" />
    <div class="text-center mt-10">
      <SubmitButton :is-loading="isLoading" text="Next" />
    </div>
  </form>
</template>

<style scoped>
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
</style>
