<script setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import SuccessNotification from '@/components/notifications/SuccessNotification.vue';
import ErrorNotification from '@/components/notifications/ErrorNotification.vue';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';

const isLoading = ref(false);
const morning = ref(false);
const day = ref(false);
const evening = ref(false);
const errors = ref(null);
const successMessage = ref('Successfully saved!');
const successNotification = ref(null);
const errorNotification = ref(null);
const getCompany = computed(() => store.getters['getCompany']);
const globalLoading = computed(() => store.state.common.loadingStatus);

async function submit() {
  isLoading.value = true;

  const formData = new FormData();

  morning.value && formData.append('app_image_morning', morning.value);
  day.value && formData.append('app_image_day', day.value);
  evening.value && formData.append('app_image_evening', evening.value);
  formData.append('name', getCompany.value.name);
  formData.append('country_code', getCompany.value.country_code);
  errors.value = null;
  const res = await store.dispatch('putCompany', {
    form: formData,
    id: getCompany.value.id
  });

  if (res.status) {
    errors.value = null;
    if (res.status) {
      successNotification.value.show();
    } else {
      errorNotification.value.show();
    }
  } else {
    errors.value = res.data;
  }
  isLoading.value = false;
}
</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box" v-if="!globalLoading">
      <div
        class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">App Images</h2>
        <!-- <h2 class="font-medium text-base ml-auto" :class="getCompany.status ? 'text-theme-9' : 'text-theme-6'">{{
            getCompany.status ? 'Active' : 'Not Active'
        }}</h2> -->
      </div>
      <div class="p-5">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 lg:col-span-4 flex lg:block flex-col-reverse">
            <div class="intro-y">
              <label class="form-label">Morning Background</label>
              <SimpleImageUpload
                :title="
                  getCompany.app_image_morning ? 'Change photo' : 'Add photo'
                "
                :image-path="getCompany.app_image_morning"
                @update-image-file="morning = $event"
              />
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4 flex lg:block flex-col-reverse">
            <div class="intro-y">
              <label class="form-label">Day Background</label>
              <SimpleImageUpload
                :title="getCompany.app_image_day ? 'Change photo' : 'Add photo'"
                :image-path="getCompany.app_image_day"
                @update-image-file="day = $event"
              />
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4 flex lg:block flex-col-reverse">
            <div class="intro-y">
              <label class="form-label">Evening Background</label>
              <SimpleImageUpload
                :title="
                  getCompany.app_image_evening ? 'Change photo' : 'Add photo'
                "
                :image-path="getCompany.app_image_evening"
                @update-image-file="evening = $event"
              />
            </div>
          </div>
          <button
            class="btn btn-primary py-3 block mx-auto px-10 align-top"
            @click="submit"
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
          <SuccessNotification
            ref="successNotification"
            :message="successMessage"
          />
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
