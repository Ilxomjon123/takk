<script setup>
import cash from 'cash-dom';
import { computed, ref, watchEffect } from 'vue';
import SubmitButton from '../buttons/SubmitButton.vue';
import CafeStatusSelect from '../selects/CafeStatusSelect.vue';

const props = defineProps({
  status: 0,
});
const emits = defineEmits(['update:status']);
const isLoading = ref(false);
const errors = ref(null);
const selectedStatus = ref(props.status);

watchEffect(() => {
  if (props.status) {
    selectedStatus.value = props.status;
  }
});
function closeModal() {
  errors.value = '';
  cash('#cafe-status-modal').modal('hide');
  // router.back();
}

function setStatus() {
  isLoading.value = true;
  if (selectedStatus.value) {
    errors.value = '';
    emits('update:status', selectedStatus.value);
    cash('#cafe-status-modal').modal('hide');
  } else errors.value = 'This field is required';
  isLoading.value = false;
}
</script>

<template>
  <div
    id="cafe-status-modal"
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
              <span class="ml-1">Select a status</span>
            </label>
            <CafeStatusSelect v-model="selectedStatus" class="w-auto" />
            <div class="text-theme-6 mt-2">{{ errors }}</div>
          </div>
        </div>
        <div class="modal-footer text-right">
          <button
            type="button"
            @click="closeModal"
            class="btn btn-outline-secondary mr-3"
          >
            Close
          </button>
          <SubmitButton
            type="button"
            :is-loading="isLoading"
            @click="setStatus"
          />
        </div>
      </div>
    </div>
  </div>
</template>
