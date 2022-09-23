<script setup>
import { onMounted, ref, watchEffect } from 'vue';

const props = defineProps({
  imagePath: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Add photo',
  },
});
const emits = defineEmits(['updateImageFile']);
const selectedFilePath = ref('/images/product_category.jpg');
const image = ref(null);

watchEffect(() => {
  if (props.imagePath) selectedFilePath.value = props.imagePath;
});

function changeImage(e) {
  selectedFilePath.value = URL.createObjectURL(e.target.files[0]);
  // image.value.src = URL.createObjectURL(e.target.files[0]);
  emits('updateImageFile', e.target.files[0]);
}

function replaceByDefault(e) {
  if (selectedFilePath.value) e.target.src = selectedFilePath.value;
  else {
    e.target.style.display = 'none';
    alert('Error while image uploading..');
  }
}

function removeImage() {
  image.value.src = '/images/plus-icon.jpg';
  emits('updateImageFile', '');
}
</script>

<template>
  <div class="mx-auto mb-5">
    <div
      class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
    >
      <div class="relative zoom-in mx-auto">
        <img
          class="rounded-md w-full"
          alt="Add image"
          :src="selectedFilePath"
          ref="image"
          @error="replaceByDefault"
          data-action="zoom"
        />
      </div>
      <div class="mx-auto relative mt-5">
        <button
          type="button"
          class="btn btn-primary w-full cursor-pointer"
          @click="$refs.inputFile.click()"
        >
          {{
            selectedFilePath !== '/images/plus-icon.jpg'
              ? 'Change photo'
              : 'Add photo'
          }}
        </button>
        <input
          type="file"
          ref="inputFile"
          class="hidden"
          @change="changeImage"
        />
      </div>
    </div>
  </div>
</template>
