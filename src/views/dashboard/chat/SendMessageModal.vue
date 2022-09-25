<script setup>
import { ref } from 'vue';
import { isEmpty, isNil } from 'lodash';
import cash from 'cash-dom';
import { useNotyf } from '@/composables/useNotyf';
import { sendMessageToCustomers } from '@/api';
import CustomerSelect from '@/components/selects/CustomerSelect.vue';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';

const notyf = useNotyf();
const selectedCustomers = ref([]);
const isLoading = ref(false);
const clearImagePath = ref(false);
const textMessage = ref('');
const imageMessage = ref(null);

async function handleSendMessage() {
  try {
    isLoading.value = true;
    if (
      !isEmpty(selectedCustomers.value) &&
      (!isEmpty(textMessage.value) || !isNil(imageMessage.value))
    ) {
      const customer_ids = selectedCustomers.value.filter(
        (item) => item !== 'all'
      );
      const isAll = selectedCustomers.value.includes('all');

      const formData = new FormData();
      !isEmpty(customer_ids) && formData.append('customer_id[]', customer_ids);
      formData.append('customer_all', isAll);
      formData.append('text', textMessage.value);
      formData.append('files', imageMessage.value);

      const res = await sendMessageToCustomers(formData);
      selectedCustomers.value = [];
      textMessage.value = '';
      imageMessage.value = null;
      clearImagePath.value = true;
      cash('#new-chatmessage-modal').modal('hide');
      notyf.success('Message send successfully!');
    } else notyf.warning('Customers not selected or message is empty');
  } catch (error) {
    notyf.error('Error while sending message to customers: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    id="new-chatmessage-modal"
    class="modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Send new message</h2>
        </div>
        <!-- END: Modal Header -->
        <div class="modal-body">
          <!-- multiselect select customers -->
          <CustomerSelect v-model="selectedCustomers" />
          <!-- message textarea -->
          <div id="classic-editor" class="mt-5">
            <div class>
              <textarea
                v-model="textMessage"
                rows="3"
                class="form-control mb-3"
              />
              <SimpleImageUpload
                class="h-full"
                :clear-image-path="clearImagePath"
                @update-image-file="imageMessage = $event"
              />
            </div>
          </div>
          <!-- action btns -->
        </div>
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer text-right">
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-outline-secondary mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleSendMessage"
          >
            Send
          </button>
        </div>
        <!-- END: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
textarea {
  width: 100%;
}
</style>
