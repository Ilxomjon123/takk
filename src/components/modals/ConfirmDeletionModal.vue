<script setup>
import cash from 'cash-dom';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  modalId: {
    type: String,
    default: 'confirm-deletion-modal',
  },
});
defineEmits(['confirm']);

function showModal() {
  cash('#' + props.modalId).modal('show');
}
</script>

<template>
  <div :id="modalId" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to delete these records?
              <br />This process cannot be undone.
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger w-24"
              data-dismiss="modal"
              @click="$emit('confirm')"
            >
              {{ isLoading ? '' : 'Delete' }}
              <LoadingIcon
                v-if="isLoading"
                icon="three-dots"
                color="white"
                class="w-8 h-8 my-2"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
