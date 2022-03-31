<script setup>
import { ref } from 'vue';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomerSelect from '@/components/selects/CustomerSelect.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';

const selectedCustomers = ref([]);
const editorData = ref('');
const editorConfig = ref({
  // extraPlugins: [uploader]
});

const textMessage = ref(null);
const imageMessage = ref(null);

function handleCreate() {
  const data = {
    customer: authUser.id
  }
}

function uploader() {
  ClassicEditor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
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
              <SimpleImageUpload
                title="Add photo"
                @update-image-file="imageMessage = $event"
              />
              <!-- <QuillEditor theme="snow" /> -->
              <!-- <ckeditor
                :editor="ClassicEditor"
                v-model="editorData"
                :config="editorConfig"
              />-->
              <!-- <component
                :is="CKEditor.component"
                :editor="ClassicEditor"
                v-model="editorData"
                :config="editorConfig"
              />-->
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
          >Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleCreate"
          >Create</button>
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
