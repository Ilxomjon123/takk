<script setup>
import cash from 'cash-dom';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  isIcon: {
    type: Boolean,
    default: false
  },
  modalId: {
    type: String,
    default: 'confirm-modal'
  },
  iconClass: {
    type: String,
    default: ''
  },
  okColor: {
    type: String,
    default: 'btn-danger'
  }
});

const emits = defineEmits(['confirm']);

function showModal() {
  cash('#' + props.modalId).modal('show');
}
</script>

<template>
  <!-- <span v-if="isIcon" @click="showModal" class="w-full">
    <TrashIcon :class="iconClass" /> Confirm
  </span>
  <a
    v-else
    href="javascript:;"
    data-toggle="modal"
    :data-target="'#' + modalId"
    class="btn btn-danger py-3 px-4 mt-8 px-10"
    :disabled="isLoading"
  >
    {{ isLoading ? '' : 'Confirm' }}
    <LoadingIcon
      v-if="isLoading"
      icon="three-dots"
      color="white"
      class="w-8 h-8 my-2"
    />
  </a> -->
  <div :id="modalId" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to confirm this action?
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
            >
              No
            </button>
            <button
              type="button"
              :class="['btn w-24', okColor]"
              data-dismiss="modal"
              @click="emits('confirm')"
            >
              {{ isLoading ? '' : 'Yes' }}
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
