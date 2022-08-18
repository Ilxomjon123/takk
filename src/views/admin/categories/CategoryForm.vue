<script setup>
import { jsonToFormData } from '@/utils/functions';
import { computed, onMounted, reactive, ref } from 'vue';
import store from '@/store';
import { fetchCategories } from '@/api/admin';
import { useRoute, useRouter } from 'vue-router';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { useStorage } from '@vueuse/core';
import Toastify from 'toastify-js';
import cash from 'cash-dom';

const route = useRoute();
const router = useRouter();
const props = defineProps({
  form: {
    type: Object,
    default: {
      image: '/src/assets/images/product_category.jpg'
    }
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  dispatcher: {
    type: String,
    default: 'postCategory'
  }
});

const category = reactive({});
const images = reactive({});
const errors = reactive({});
const isLoading = ref(false);
const menuID = useStorage('selected-productmenu-id', null);
const filteredCategories = ref([]);

onMounted(async () => {
  // store.commit('setSelectedMenuId', menuID);
  Object.assign(category, props.form);
  const res = await fetchCategories(menuID.value);
  filteredCategories.value = res.results?.filter(
    item => item.id !== category?.id
  );
});

function clickInput(name) {
  document.getElementById(name).click();
}

function changeImage(e, name) {
  images[name] = e.target.files[0];
  const fileUrl = URL.createObjectURL(e.target.files[0]);
  category[name] = fileUrl;
}

async function submit() {
  isLoading.value = true;

  if (category?.parent == 0) {
    category.parent = null;
  }

  let formData;
  const data = { ...category, ...images, menu: menuID.value };

  if (typeof data.image == 'string') delete data.image;

  if (props.isEdit) {
    formData = {
      id: data.id,
      form: jsonToFormData(data)
    };
  } else {
    formData = jsonToFormData(data);
  }

  const res = await store.dispatch(props.dispatcher, formData);

  if (res.status) {
    Object.assign(errors, {});
    Toastify({
      node: cash('#success-notification-content')
        .clone()
        .removeClass('hidden')[0]
    }).showToast();
  } else {
    Object.assign(errors, res.data);
    Toastify({
      node: cash('#error-notification-content')
        .clone()
        .removeClass('hidden')[0]
    }).showToast();
  }
  isLoading.value = false;
}

function getError(key) {
  return errors[key]?.[0];
}
</script>

<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <!-- <div class="intro-y">
      <div
        class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
      >
        <div class="h-60 w-60 image-fit cursor-pointer zoom-in mx-auto">
          <img class="rounded-md" alt="Takk" :src="category?.image" />
          <input
            type="file"
            hidden
            id="avatar-image"
            @change="e => changeImage(e, 'image')"
          />
        </div>
        <div class="text-theme-6" v-text="getError('image')" />
        <div class="mx-auto cursor-pointer relative mt-5">
          <button
            type="button"
            @click="clickInput('avatar-image')"
            class="btn btn-primary w-full"
          >
            Change Photo
          </button>
        </div>
      </div>
    </div> -->
    <SimpleImageUpload
      class="w-52"
      :title="category.image ? 'Change photo' : 'Add photo'"
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
      <div class="w-full md:w-1/2 px-3 mb-3">
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
      </div>
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
          <InfoIcon class="block text-xs" />
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
            placeholder: 'Select Category'
          }"
          class="w-full"
        >
          <option value="0">- - - - - - -</option>
          <option
            v-for="(item, index) in filteredCategories"
            :key="index"
            :value="item.id"
            >{{ item.name }}</option
          >
        </TomSelect>
        <div class="text-theme-6" v-text="getError('parent')" />
      </div>
      <div class="text-theme-6" v-text="errors?.detail" />
    </div>
    <div>
      <div class="mx-auto">
        <button
          type="submit"
          class="btn btn-primary mt-8 px-10 py-3 px-4 mr-3"
          :disabled="isLoading"
        >
          {{ isLoading ? '' : 'Save' }}
          <LoadingIcon
            v-if="isLoading"
            icon="three-dots"
            color="white"
            class="my-2"
          />
        </button>
      </div>
    </div>
  </form>
  <!-- <SuccessNotification ref="successNotification" :message="successMessage" />
  <ErrorNotification ref="errorNotification" /> -->
</template>

<style>
input[type='time']::-webkit-calendar-picker-indicator {
  filter: invert(100%) sepia(13%) saturate(3207%) hue-rotate(130deg)
    brightness(100%) contrast(80%);
}
</style>