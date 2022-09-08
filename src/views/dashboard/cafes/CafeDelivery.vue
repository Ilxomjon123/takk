<script setup>
import InputField from './InputField.vue';
import SubmitButton from '../../../components/buttons/SubmitButton.vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => {},
  },
  externalErrors: {
    type: Object,
    default: () => {},
  },
  isLoading: false,
});

const emit = defineEmits(['update:formData']);

async function submit() {
  emit('update:formData', props.formData);
}
</script>

<template>
  <div class="intro-y box lg:mt-5">
    <div
      class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-base mr-auto">Cafe Delivery</h2>
    </div>
    <form class="p-5" @submit.prevent="submit">
      <div class="flex xl:flex-row flex-col">
        <div class="flex-1 mt-6 xl:mt-0">
          <div class="flex">
            <div class="form-check w-auto">
              <input
                id="delivery_available"
                class="form-check-switch"
                type="checkbox"
                v-model="formData.delivery_available"
              />
              <label class="form-check-label" for="delivery_available"
                >Delivery available</label
              >
            </div>
          </div>
          <template v-if="formData.delivery_available">
            <div class="flex flex-col lg:flex-row gap-5 pt-5">
              <div class="input-form lg:basis-1/2">
                <label
                  for="delivery_max_distance"
                  class="form-label w-full flex flex-col sm:flex-row"
                  >Delivery max distance</label
                >
                <div class="input-group">
                  <div id="input-group-km" class="input-group-text">km</div>
                  <input
                    id="delivery_max_distance"
                    v-model="formData.delivery_max_distance"
                    type="number"
                    class="form-control"
                    aria-describedby="input-group-km"
                  />
                  <span class="text-theme-6 mt-2">{{
                    externalErrors.delivery_max_distance &&
                    externalErrors.delivery_max_distance[0]
                  }}</span>
                </div>
              </div>
              <div class="input-form lg:basis-1/2">
                <label
                  for="delivery_min_amount"
                  class="form-label w-full flex flex-col sm:flex-row"
                  >Delivery min amount</label
                >
                <div class="input-group">
                  <div id="input-group-dollarsign" class="input-group-text">
                    $
                  </div>
                  <input
                    id="delivery_min_amount"
                    v-model="formData.delivery_min_amount"
                    type="number"
                    step="0.001"
                    class="form-control"
                    aria-describedby="input-group-dollarsign"
                  />
                  <span class="text-theme-6 mt-2">{{
                    externalErrors.delivery_min_amount &&
                    externalErrors.delivery_min_amount[0]
                  }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row gap-5 pt-5">
              <div class="input-form lg:basis-1/2">
                <label
                  for="delivery_fee"
                  class="form-label w-full flex flex-col sm:flex-row"
                  >Fixed fee</label
                >
                <div class="input-group">
                  <div id="input-group-dollarsign" class="input-group-text">
                    $
                  </div>
                  <input
                    id="delivery_fee"
                    v-model="formData.delivery_fee"
                    type="number"
                    step="0.001"
                    class="form-control"
                    aria-describedby="input-group-dollarsign"
                  />
                  <span class="text-theme-6 mt-2">{{
                    externalErrors.delivery_fee &&
                    externalErrors.delivery_fee[0]
                  }}</span>
                </div>
              </div>
              <div class="input-form lg:basis-1/2">
                <label
                  for="delivery_percent"
                  class="form-label w-full flex flex-col sm:flex-row"
                  >% of order fee</label
                >
                <input
                  id="delivery_percent"
                  v-model="formData.delivery_percent"
                  type="number"
                  step="0.001"
                  class="form-control"
                  placeholder="Type.."
                />
                <span class="text-theme-6 mt-2">{{
                  externalErrors.delivery_percent &&
                  externalErrors.delivery_percent[0]
                }}</span>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row gap-5 py-5">
              <div class="input-form lg:basis-1/2">
                <label
                  for="delivery_km_amount"
                  class="form-label w-full flex flex-col sm:flex-row"
                  >Fee per kilometer</label
                >
                <input
                  id="delivery_km_amount"
                  v-model="formData.delivery_km_amount"
                  type="number"
                  class="form-control"
                  placeholder="Type.."
                />
                <span class="text-theme-6 mt-2">{{
                  externalErrors.delivery_km_amount &&
                  externalErrors.delivery_km_amount[0]
                }}</span>
              </div>
              <div class="input-form lg:basis-1/2">
                <label
                  for="delivery_min_time"
                  class="form-label w-full flex flex-col sm:flex-row"
                  >Delivery time (in minutes)</label
                >
                <input
                  id="delivery_min_time"
                  v-model="formData.delivery_min_time"
                  type="number"
                  class="form-control"
                  placeholder="Type.."
                />
                <span class="text-theme-6 mt-2">{{
                  externalErrors.delivery_min_time &&
                  externalErrors.delivery_min_time[0]
                }}</span>
              </div>
            </div>
          </template>
          <div class="flex justify-end gap-3">
            <SubmitButton :is-loading="isLoading" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
