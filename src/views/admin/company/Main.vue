<script setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import SuccessNotification from '@/components/notifications/SuccessNotification.vue';
import ErrorNotification from '@/components/notifications/ErrorNotification.vue';
import StateSelect from '@/components/selects/StateSelect.vue';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import TelInput from '../../../components/forms/TelInput.vue';
import CompanyCard from '../../../components/cards/CompanyCard.vue';
import useCountries from '../../../features/useCountries';

const image = ref(null)
const isLoading = ref(false)
const errors = ref(null)
const successMessage = ref("Successfully saved!")
const successNotification = ref(null);
const errorNotification = ref(null);
const getCompany = computed(() => store.getters["getCompany"])
if(getCompany.value.cashback_percent == null) getCompany.value.cashback_percent = 10;
const globalLoading = computed(() => store.state.common.loadingStatus)

const {
  setSelectedState,
  setSelectedCountry,
} = useCountries();


onMounted(async () => {
  // store.commit('setLoadingStatus', true);
  // await store.dispatch('fetchCompany');
  // getCompany.value = store.getters["getCompany"]
  // console.log(getCompany.value);
  if (getCompany.value?.country) {
    // console.log('country: ', getCompany.value.country);
    setSelectedCountry(getCompany.value.country)
  }

  if (getCompany.value?.state) {
    // console.log('state: ', getCompany.value.state);
    setSelectedState(getCompany.value.state)
  }

  // store.commit('setLoadingStatus', false);
});

async function submit() {
  isLoading.value = true;

  const formData = new FormData();

  image.value && formData.append('logo', image.value);
  formData.append('name', getCompany.value.name);
  formData.append('phone', getCompany.value.phone.replace(/\s+/g, ''));
  formData.append('email', getCompany.value.email);
  formData.append('website', getCompany.value.website);
  formData.append('country', getCompany.value.country);
  formData.append('country_code', getCompany.value.country_code || 'US');
  formData.append('state', getCompany.value.state);
  formData.append('city', getCompany.value.city);
  formData.append('address', getCompany.value.address);
  formData.append('second_address', getCompany.value.second_address);
  formData.append('postal_code', getCompany.value.postal_code);
  formData.append('cashback_percent', getCompany.value.cashback_percent);
  formData.append('pub_show_reviews', getCompany.value.pub_show_reviews);
  formData.append('pub_show_like', getCompany.value.pub_show_like);
  formData.append('about', getCompany.value.about);

  errors.value = null;
  const res = await store.dispatch('putCompany', { form: formData, id: getCompany.value.id });
  await store.dispatch('fetchCompany');

  if (res.status) {
    errors.value = null;
    if (res.status) {
      successNotification.value.show();
    }
    else {
      errorNotification.value.show();
    }
  }
  else {
    errors.value = res.data;
  }
  isLoading.value = false;
}

function getError(key) {
  return errors.value && errors.value[key]?.[0];
}
</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box" v-if="!globalLoading">
      <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">Information</h2>
        <!-- <h2 class="font-medium text-base ml-auto" :class="getCompany.status ? 'text-theme-9' : 'text-theme-6'">{{
            getCompany.status ? 'Active' : 'Not Active'
        }}</h2> -->
      </div>
      <div class="p-5">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
            <div class="intro-y">
              <label class="form-label">Company Logo</label>
              <SimpleImageUpload :title="getCompany.logo ? 'Change photo' : 'Add photo'" :image-path="getCompany.logo"
                @update-image-file="image = $event" />
            </div>
          </div>
          <form @submit.prevent="submit" class="col-span-12 lg:col-span-8 2xl:col-span-9">
            <div class="flex flex-wrap -mx-3 mb-3">
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label for="company-name" class="form-label">
                  Company Name
                  <span class="text-theme-6">*</span>
                </label>
                <input id="company-name" type="text" class="form-control"
                  :class="getError('name') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Company Name"
                  v-model="getCompany.name" required />
                <div class="text-theme-6" v-text="getError('name')" />
              </div>
              <div class="w-full md:w-1/2 px-3 md:mb-0">
                <label for="phone" class="form-label">Phone</label>
                <TelInput v-model="getCompany.phone" />
                <div class="text-theme-6" v-text="getError('phone')" />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label for="company-email" class="form-label">Email</label>
                <input id="company-email" type="email" class="form-control"
                  :class="getError('email') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Email"
                  v-model="getCompany.email" />
                <div class="text-theme-6" v-text="getError('email')" />
              </div>
              <div class="w-full md:w-1/2 px-3 md:mb-0">
                <label for="website" class="form-label">Website</label>
                <input id="website" type="text" class="form-control"
                  :class="getError('website') != null ? 'border-theme-6' : 'border-gray-300'"
                  placeholder="https://example.com" v-model="getCompany.website" />
                <div class="text-theme-6" v-text="getError('website')" />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
              <div class="w-full px-3 md:mb-0 md:w-1/3">
                <label class="form-label">Country</label>
                <CountrySelect :class="getError('country') != null ? 'border-theme-6' : 'border-gray-300'"
                  v-model="getCompany.country" />
                <div class="text-theme-6 mt-2" v-text="getError('country')" />
              </div>
              <div class="w-full px-3 mb-3 md:w-1/3 md:mb-0">
                <label for="state" class="form-label">State</label>
                <StateSelect v-model="getCompany.state" id="state" />
                <div class="text-theme-6" v-text="getError('state')" />
              </div>
              <div class="w-full px-3 md:mb-0 md:w-1/3">
                <label class="form-label">City</label>
                <CitySelect :class="getError('city') != null ? 'border-theme-6' : 'border-gray-300'"
                  v-model="getCompany.city" />
                <div class="text-theme-6 mt-2" v-text="getError('city')" />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label for="postal-code" class="form-label">Postal Code</label>
                <input id="postal-code" class="form-control"
                  :class="getError('postal_code') != null ? 'border-theme-6' : 'border-gray-300'"
                  placeholder="Postal Code" v-model="getCompany.postal_code" />
                <div class="text-theme-6" v-text="getError('postal_code')" />
              </div>
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label for="address" class="form-label">Address</label>
                <input id="address" type="text" class="form-control"
                  :class="getError('address') != null ? 'border-theme-6' : 'border-gray-300'" placeholder="Address"
                  v-model="getCompany.address" />
                <div class="text-theme-6" v-text="getError('address')" />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 md:mb-5">
              <div class="w-full md:w-1/2 px-3 md:mb-0">
                <label for="second-address" class="form-label">Additional address line</label>
                <input id="second-address" type="text" class="form-control"
                  :class="getError('second_address') != null ? 'border-theme-6' : 'border-gray-300'"
                  placeholder="Additional address line" v-model="getCompany.second_address" />
                <div class="text-theme-6 mt-2" v-text="getError('second_address')" />
              </div>
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label for="cashback" class="form-label">Cashback Percent</label>
                <div class="input-group">
                  <div id="input-group-percent" class="input-group-text">%</div>
                  <TomSelect id="cashback" class="w-full"
                    :class="getError('cashback_percent') != null ? 'border-theme-6' : 'border-gray-300'"
                    v-model="getCompany.cashback_percent" aria-describedby="input-group-percent">
                    <option value="10">10</option>
                    <option value="5">5</option>
                  </TomSelect>
                  <div class="text-theme-6 mt-2" v-text="getError('cashback_percent')" />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <div class="form-check w-full sm:w-auto mt-3 sm:mt-0">
                  <input id="show-example-5" data-target="#select-options" class="show-code form-check-switch mr-3 ml-0"
                    type="checkbox" v-model="getCompany.pub_show_reviews" />
                  <label for="show-example-5">Make customer reviews public</label>
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <div class="form-check w-full sm:w-auto mt-3 sm:mt-0">
                  <input id="show-example-6" data-target="#select-options" class="show-code form-check-switch mr-3 ml-0"
                    type="checkbox" v-model="getCompany.pub_show_like" />
                  <label for="show-example-6">Make customer likes/dislikes public</label>
                </div>
              </div>
            </div>
            <div>
              <label for="about" class="form-label">About</label>
              <textarea id="about" class="form-control"
                :class="getError('about') != null ? 'border-theme-6' : 'border-gray-300'"
                placeholder="Describe your company" v-model="getCompany.about" />
              <div class="text-theme-6" v-text="getError('about')" />
            </div>
            <div>
              <button type="submit" class="btn btn-primary py-3 block mx-auto mt-8 px-10 align-top"
                :disabled="isLoading">
                {{ isLoading ? '' : 'Save' }}
                <LoadingIcon v-if="isLoading" icon="three-dots" color="white" class="w-8 h-8 my-2" />
              </button>
            </div>
          </form>
          <SuccessNotification ref="successNotification" :message="successMessage" />
          <ErrorNotification ref="errorNotification" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ts-input {
  z-index: inherit !important;
}
</style>
