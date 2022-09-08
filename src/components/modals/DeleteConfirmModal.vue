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
    default: 'delete-modal',
  },
  iconClass: {
    type: String,
    default: '',
  },
});
defineEmits(['onConfirmedDelete']);

function showModal() {
  cash('#' + props.modalId).modal('show');
}
</script>

<template>
  <div>
    <span v-if="isIcon" @click="showModal" class="w-full">
      <TrashIcon :class="iconClass" /> Delete
    </span>
    <a
      v-else
      href="javascript:;"
      class="btn btn-danger"
      data-toggle="modal"
      :data-target="'#' + modalId"
      :disabled="isLoading"
    >
      <LoadingIcon
        v-if="isLoading"
        icon="three-dots"
        color="white"
        class="w-8 h-8 my-2"
      />
      <span v-else>Delete</span>
    </a>
    <div :id="modalId" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body pb-5">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these records?
                <br />This process cannot be undone.
              </div>
            </div>
            <div class="flex justify-center gap-3">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary dark:border-dark-5 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-danger"
                @click="$emit('onConfirmedDelete')"
              >
                <LoadingIcon
                  v-if="isLoading"
                  icon="three-dots"
                  color="white"
                  class="my-1 mx-2"
                />
                <span v-else>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
