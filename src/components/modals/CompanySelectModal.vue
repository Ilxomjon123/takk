<script setup>
import cash from 'cash-dom';
import { ref } from 'vue';
import router from '@/router';
import CompanySelect from '../selects/CompanySelect.vue';
import SubmitButton from '../buttons/SubmitButton.vue';

const isLoading = ref(false);
const errors = ref(null);
const selectedCompany = ref(null);

function closeModal() {
  errors.value = '';
  cash('#company-select-modal').modal('hide');
  router.back();
}

function setCompany() {
  isLoading.value = true;
  if (selectedCompany.value) {
    errors.value = '';
    cash('#company-select-modal').modal('hide');
  } else errors.value = 'This field is required';
  isLoading.value = false;
}
</script>

<template>
  <div
    id="company-select-modal"
    class="modal"
    data-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
          <div class="col-span-12">
            <label for="menu-name" class="form-label">
              <span class="text-theme-6">*</span>
              <span class="ml-1">Select a company</span>
            </label>
            <CompanySelect class="w-auto" />
            <!-- <div class="text-red-500">{{ errors }}</div> -->
            <div class="text-theme-6 mt-2">{{ errors }}</div>
          </div>
        </div>
        <div class="modal-footer text-right">
          <button
            type="button"
            @click="closeModal"
            class="btn btn-outline-secondary mr-3"
          >
            Back
          </button>
          <SubmitButton
            type="button"
            :is-loading="isLoading"
            @click="setCompany"
          />
        </div>
      </div>
    </div>
  </div>
</template>
