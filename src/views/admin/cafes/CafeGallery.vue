<script setup>
import { useRoute } from 'vue-router';
import { addCafeGallery } from '@/api/admin';
import MultipleImageUpload from './MultipleImageUpload.vue';
import { useNotyf } from '@/composables/useNotyf';
import { ref } from 'vue';
import SubmitButton from '@/components/buttons/SubmitButton.vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => {},
  },
  externalErrors: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(['update:formData']);
const route = useRoute();
const notyf = useNotyf();
const isLoading = ref(false);

async function submit() {
  isLoading.value = true;

  try {
    if (props.formData?.upload_photos?.length) {
      const imagesFormData = new FormData();

      for (let image of props.formData.upload_photos) {
        imagesFormData.append('images', image);
      }

      imagesFormData.append('cafe', props.formData.id);
      await addCafeGallery(imagesFormData);
      notyf.success();
    } else notyf.warning('There is nothing to update!');
  } catch (error) {
    notyf.error();
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="intro-y box lg:mt-5">
    <div
      class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-base mr-auto">Cafe gallery</h2>
    </div>
    <div class="p-5">
      <div class="flex xl:flex-row flex-col">
        <div class="flex-1 mt-6 xl:mt-0">
          <MultipleImageUpload
            @update:image-files="formData.upload_photos = $event"
            :obj-id="route.params.id"
            class="my-5"
          />
          <div class="flex justify-end gap-3">
            <SubmitButton :is-loading="isLoading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
