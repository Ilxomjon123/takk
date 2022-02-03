<template>
  <div class="flex flex-col md:flex-row flex-wrap w-full">
    <div
      class="md:basis-1/2 lg:basis-1/4 xl:basis-1/6 border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
    >
      <button
        type="button"
        class="btn w-full h-40 border-2 shadow-sm border-gray-200 dark:border-dark-5 rounded-md"
        @click="$refs.inputFile.click()"
      >
        <PlusIcon />
        <!-- <p>Add image</p> -->
      </button>
      <input
        type="file"
        ref="inputFile"
        multiple
        class="hidden"
        @change="addImage"
      />
    </div>
    <div
      v-for="item, index in images"
      class="md:basis-1/2 lg:basis-1/4 xl:basis-1/6 border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
    >
      <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
        <img
          class="rounded-md"
          alt="Logo"
          :src="item"
          @error="replaceByDefault"
        />
        <Tippy
          tag="div"
          content="Remove this logo?"
          class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-6 right-0 top-0 -mr-2 -mt-2"
          @click="removeImage(item, index)"
        >
          <xIcon class="w-4 h-4" />
        </Tippy>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import _ from "lodash";

export default defineComponent({
  props: {
    externalImages: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    selectedFilePath: '/src/assets/images/plus-icon.jpg',
    images: []
  }),
  computed: {
    getSelectedFilePath() {
      return this.imagePath || this.selectedFilePath
    }
  },
  mounted() {
    console.log('ok');
    if (this.imagePath) {
      this.selectedFilePath = this.imagePath
    }
  },
  methods: {
    addImage(e) {
      if (this.images.length < 5) {
        e.target.files.forEach(file => {
          if (this.images.length < 5) {
            this.images.push(URL.createObjectURL(file))
          } else return;
        })
      } else alert('You can add max 5 images')
    },
    removeImage(img, index) {
      this.images = _.remove(this.images, (el, idx) => idx !== index)
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
