<template>
  <!-- BEGIN: Multiple File Upload -->
  <div class="intro-y box mt-5">
    <div
      class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-base mr-auto">Multiple Image Upload</h2>
    </div>
    <div id="multiple-file-upload" class="p-5">
      <!-- <Dropzone
        ref-key="dropzoneMultipleRef"
        :options="{
          // url: 'https://httpbin.org/post',
          autoProcessQueue: false,
          aploadMultiple: true,
          parallelUploads: 100,
          maxFiles: 100,
          thumbnailWidth: 150,
          maxFilesize: 2,
          // acceptedFiles: 'image/jpeg|image/png|image/jpg',
          // headers: { 'My-Awesome-Header': 'header value' }
        }"
        class="dropzone"
      >
        <div class="text-lg font-medium">Drop files here or click to upload.</div>
        <div class="text-gray-600">
          This is just a demo dropzone. Selected files are
          <span
            class="font-medium"
          >not</span> actually uploaded.
        </div>
      </Dropzone>-->
      <upload-media
        server="/api/upload"
        error="@error('media'){{$message}}@enderror"
      ></upload-media>
    </div>
  </div>
  <!-- END: Multiple File Upload -->
</template>

<script>
import { defineComponent, ref, provide, onMounted } from 'vue'
import { UploadMedia, UpdateMedia } from "@s1modev/media-upload";

export default defineComponent({
  components: {
    UploadMedia,
    UpdateMedia
  }
});
</script>
