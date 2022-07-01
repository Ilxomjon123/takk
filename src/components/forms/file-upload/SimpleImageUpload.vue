<template>
  <div class="mx-auto mb-5">
    <div
      class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
    >
      <div class="h-40 relative image-fit zoom-in mx-auto">
        <img
          class="rounded-md"
          alt="Add image"
          :src="imagePath"
          ref="image"
          @error="replaceByDefault"
          data-action="zoom"
        />
        <!-- <Tippy
          tag="div"
          content="Remove this logo?"
          class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-6 right-0 top-0 -mr-2 -mt-2"
          @click="removeImage"
        >
          <xIcon class="w-4 h-4" />
        </Tippy>-->
      </div>
      <div class="mx-auto relative mt-5">
        <button
          type="button"
          class="btn btn-primary w-full cursor-pointer"
          @click="$refs.inputFile.click()"
        >{{ title }}</button>
        <input type="file" ref="inputFile" class="hidden" @change="changeImage" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ['imagePath', 'title'],
  data: () => ({
    selectedFilePath: '/src/assets/images/plus-icon.jpg'
  }),
  mounted() {
    if (this.imagePath) {
      this.selectedFilePath = this.imagePath
    }
  },
  methods: {
    changeImage(e) {
      this.selectedFilePath = URL.createObjectURL(e.target.files[0])
      this.$refs.image.src = URL.createObjectURL(e.target.files[0])
      this.$emit("updateImageFile", e.target.files[0]);
    },
    removeImage() {
      this.$refs.image.src = '/src/assets/images/plus-icon.jpg'
      this.$emit('updateImageFile', '')
    },
    replaceByDefault(e) {
      if (this.selectedFilePath)
        e.target.src = this.selectedFilePath
      else {
        e.target.style.display = 'none'
        alert('Error while image uploading..')
      }
    }
  }

});
</script>
