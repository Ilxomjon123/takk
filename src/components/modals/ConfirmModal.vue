<script setup>
import cash from 'cash-dom';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isIcon: {
    type: Boolean,
    default: false,
  },
  modalId: {
    type: String,
    default: 'confirm-modal',
  },
  iconClass: {
    type: String,
    default: '',
  },
  okColor: {
    type: String,
    default: 'btn-danger',
  },
});

const emits = defineEmits(['confirm']);

function showModal() {
  cash('#' + props.modalId).modal('show');
}
</script>

<template>
  <div :id="modalId" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center">
            <XCircleIcon class="w-16 h-16 text-theme-6" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to confirm this action?
            </div>
          </div>
          <div class="flex justify-center gap-5 mt-5">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary dark:border-dark-5 dark:text-gray-300 w-24"
            >
              No
            </button>
            <button
              type="button"
              :class="['btn w-24', okColor]"
              data-dismiss="modal"
              @click="emits('confirm')"
            >
              <span>Yes</span>
              <LoadingIcon
                v-if="isLoading"
                icon="three-dots"
                color="white"
                class="my-2"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
