<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { isEmpty } from 'lodash';
import CustomerSelect from '@/components/selects/CustomerSelect.vue';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { sendMessageToCustomers } from '@/api';

const store = useStore()
const selectedCustomers = ref([]);

const textMessage = ref(null);
const imageMessage = ref(null);

async function handleSendMessage() {
  store.commit('setLoadingStatus', true)
  const customer_ids = selectedCustomers.value.filter(item => item !== 'all')
  const isAll = selectedCustomers.value.includes('All');

  const formData = new FormData();
  !isEmpty(customer_ids) && formData.append('customer_id[]', customer_ids)
  formData.append('customer_all', isAll)
  formData.append('text', textMessage.value)
  formData.append('files[]', imageMessage.value)

  const res = await sendMessageToCustomers(formData)
  store.commit('setLoadingStatus', false)
}
</script>

<template>
  <div id="new-chatmessage-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Create new message</h2>
        </div>
        <!-- END: Modal Header -->
        <div class="modal-body">
          <!-- multiselect select customers -->
          <CustomerSelect v-model="selectedCustomers" />
          <!-- message textarea -->
          <div id="classic-editor" class="mt-5">
            <div class>
              <textarea v-model="textMessage" rows="5" class="form-control" />
              <SimpleImageUpload title="Add photo" @update-image-file="imageMessage = $event" />
            </div>
          </div>
          <!-- action btns -->
        </div>
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer text-right">
          <button type="button" data-dismiss="modal" class="btn btn-outline-secondary mr-1">Cancel</button>
          <button type="button" class="btn btn-primary" @click="handleSendMessage">Create</button>
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
