<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import store from '@/store';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { useNotyf } from '@/composables/useNotyf';
import { useRoute } from 'vue-router';
import useCompany from '../../../features/useCompany';

const { getSelected } = useCompany();
const route = useRoute();
const notyf = useNotyf();
const isLoading = ref(false);
const morning = ref(false);
const day = ref(false);
const evening = ref(false);
const errors = ref(null);
const getCompany = reactive({});
// const getCompany = computed(() => store.getters['getCompany']);

watchEffect(() => {
  Object.assign(getCompany, getSelected.value);
});

async function submit() {
  try {
    isLoading.value = true;
    errors.value = null;

    const formData = new FormData();

    if (!morning.value && !day.value && !evening.value) {
      return notyf.warning('There is nothing to update!');
    }
    morning.value && formData.append('app_image_morning', morning.value);
    day.value && formData.append('app_image_day', day.value);
    evening.value && formData.append('app_image_evening', evening.value);
    formData.append('name', getCompany.name);
    formData.append('country_code', getCompany.country_code ?? '');

    const res = await store.dispatch('adminCompany/putCompany', {
      form: formData,
      id: getCompany.id
    });

    notyf.success();
    morning.value = false;
    day.value = false;
    evening.value = false;
  } catch (error) {
    notyf.error();
    errors.value = error.response?.data?.errors;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box">
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
        </div>
        <button
          type="button"
          class="btn btn-primary py-3 ml-auto px-10 align-top"
          @click="submit"
          :disabled="isLoading"
        >
          <LoadingIcon v-if="isLoading" color="white" class="w-5 h-5" />
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ts-input {
  z-index: inherit !important;
}
</style>
