<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { remove } from 'lodash';
import store from '@/store';
import { deleteCafeImage, fetchCafeGallery } from '@/api';
import { useNotyf } from '@/composables/useNotyf';

const props = defineProps({
  objId: null,
});

const emit = defineEmits(['update:image-files']);

const route = useRoute();
const notyf = useNotyf();
const inputFile = ref(null);
const imageFiles = ref([]);
const imageSources = ref([]);

onMounted(async () => {
  if (route.params.id) {
    fetchCafeGallery(route.params.id).then((res) => {
      imageSources.value = res || [];
    });
  }
});

function addImage(e) {
  const files = [...e.target?.files];

  if (imageSources.value.length + files.length <= 5) {
    files.forEach((file, fileIndex) => {
      imageSources.value.push({
        image: URL.createObjectURL(file),
        id: `img-${fileIndex}-${new Date().getTime()}`,
      });
      imageFiles.value.push(file);
    });
    emit('update:image-files', imageFiles.value);
  } else {
    notyf.warning('You can add max 5 images');
  }
}

function removeImage(imgID, imgIndex) {
  imageSources.value = remove(imageSources.value, (el, idx) => el.id !== imgID);
  imageFiles.value = remove(imageFiles.value, (el, idx) => imgIndex !== idx);
  emit('update:image-files', imageFiles.value);

  if (!String(imgID).startsWith('img')) {
    deleteCafeImage(imgID);
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row flex-wrap w-full">
    <div
      class="md:basis-1/2 lg:basis-1/4 2xl:basis-1/6 border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
    >
      <button
        type="button"
        class="btn w-full h-24 lg:h-40 border-2 shadow-sm border-gray-200 dark:border-dark-5 rounded-md"
        @click="inputFile.click()"
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
      v-for="(item, itemIndex) in imageSources"
      class="md:basis-1/2 lg:basis-1/4 2xl:basis-1/6 border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
    >
      <div
        class="h-24 lg:h-40 relative image-fit cursor-pointer zoom-in mx-auto"
      >
        <img
          class="rounded-md"
          alt="Logo"
          :src="item.image_small || item.image"
          data-action="zoom"
        />
        <Tippy
          tag="div"
          content="Remove this logo?"
          class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-6 right-0 top-0 -mr-2 -mt-2"
          @click="removeImage(item.id, itemIndex)"
        >
          <xIcon class="w-4 h-4" />
        </Tippy>
      </div>
    </div>
  </div>
</template>
