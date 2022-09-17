<script setup>
import { jsonToFormData } from '@/utils/functions';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import store from '@/store';
import { fetchCategories } from '@/api/admin';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { useStorage } from '@vueuse/core';
import { useNotyf } from '@/composables/useNotyf';
import SubmitButton from '@/components/buttons/SubmitButton.vue';

const props = defineProps({
  form: {
    type: Object,
    default: {
      image: '/images/product_category.jpg',
    },
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  dispatcher: {
    type: String,
    default: 'postCategory',
  },
});

const notyf = useNotyf();
const category = reactive({});
const images = reactive({});
const errors = reactive({
  name: [],
});
const isLoading = ref(false);
const menuID = useStorage('selected-productmenu-id', null);
const filteredCategories = ref([]);

onMounted(async () => {
  // store.commit('setSelectedMenuId', menuID);
  const res = await fetchCategories(menuID.value);
  filteredCategories.value = res.results?.filter(
    (item) => item.id !== category?.id
  );
});

watchEffect(() => {
  if (props.form) Object.assign(category, props.form);
});

async function submit() {
  try {
    isLoading.value = true;
    errors.name = [];

    if (category?.parent == 0) {
      category.parent = null;
    }

    let formData;
    const data = { ...category, ...images, menu: menuID.value };

    if (typeof data.image == 'string') delete data.image;

    if (props.isEdit) {
      formData = {
        id: data.id,
        form: jsonToFormData(data),
      };
    } else {
      formData = jsonToFormData(data);
    }

    const res = await store.dispatch(props.dispatcher, formData);

    notyf.success();
  } catch (error) {
    Object.assign(errors, error.response.data);
    notyf.error();
  } finally {
    isLoading.value = false;
  }
}

function getError(key) {
  return errors[key]?.[0];
}
</script>

<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <SimpleImageUpload
      class="w-52"
      :image-path="category.image_medium"
      @update-image-file="category.image = $event"
    />
    <span class="text-theme-6 mt-2" v-text="getError('image')" />
  </div>
  <form
    @submit.prevent="submit"
    class="col-span-12 lg:col-span-8 2xl:col-span-9"
  >
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3 mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          id="name"
          type="text"
          class="form-control"
          :class="
            getError('name') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Name"
          v-model="category.name"
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
      <label for="start-time" class="w-full px-3 mb-2"
        >Available Time
        <Tippy
          tag="a"
          href="javascript:;"
          content="If left blank product is always available."
        >
          <InfoIcon class="block text-xs w-4" />
        </Tippy>
      </label>
      <div class="w-full px-3 mb-3 md:w-1/2">
        <input
          id="start-time"
          type="time"
          class="form-control"
          :class="
            getError('start') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Username"
          v-model="category.start"
        />
        <div class="text-theme-6" v-text="getError('start')" />
      </div>
      <div class="w-full px-3 mb-3 md:w-1/2">
        <input
          id="end-time"
          type="time"
          class="form-control"
          :class="
            getError('end') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Username"
          v-model="category.end"
        />
        <div class="text-theme-6" v-text="getError('end')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label class="form-label">Parent Category</label>
        <TomSelect
          v-model="category.parent"
          :options="{
            placeholder: 'Select Category',
          }"
          class="w-full"
        >
          <option value="0">- - - - - - -</option>
          <option
            v-for="(item, index) in filteredCategories"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </TomSelect>
        <div class="text-theme-6" v-text="getError('parent')" />
      </div>
      <div class="text-theme-6" v-text="errors?.detail" />
      <!-- <div class="w-full md:w-1/2 px-3 mb-3">
        <div class="form-check">
          <input
            v-model="category.available"
            id="category-available"
            class="form-check-switch"
            type="checkbox"
          />
          <label class="form-check-label text-base" for="category-available"
            >Available</label
          >
        </div>
      </div> -->
      <div class="w-full md:w-1/2 px-3 mb-3">
        <div class="form-check">
          <input
            v-model="category.is_kitchen"
            id="kitchen-order"
            class="form-check-switch"
            type="checkbox"
          />
          <label class="form-check-label text-base" for="kitchen-order"
            >Kitchen Order</label
          >
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-3">
      <SubmitButton :is-loading="isLoading" />
    </div>
  </form>
</template>

<style>
input[type='time']::-webkit-calendar-picker-indicator {
  filter: invert(100%) sepia(13%) saturate(3207%) hue-rotate(130deg)
    brightness(100%) contrast(80%);
}
</style>
