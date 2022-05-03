<script setup>
import Toastify from 'toastify-js';
import cash from 'cash-dom';
import { useStore } from 'vuex';
import { onMounted, reactive, ref } from 'vue';
import { updateProduct } from '@/api';
import { useRoute } from 'vue-router';
import { fetchProduct } from '../../../api';
import _ from 'lodash';
import FormFields from './FormFields.vue';

const store = useStore()
const externalErrors = ref({});
const isLoading = ref(false);
const route = useRoute()

const formFields = reactive({
  sizes: [
    {
      name: '',
      square_id: '',
      price: 0,
      available: false,
      default: false,
    }
  ],
  modifiers: [],
  quickest_time: 5
});

const productImagePath = ref(null);

onMounted(() => {
  store.commit('setLoadingStatus', true)
  fetchProduct(route.params.id).then(res => {
    formFields.sizes = res.sizes
    formFields.start = res.start
    formFields.end = res.end
    formFields.quickest_time = res.quickest_time
    formFields.square_id = res.square_id
    formFields.name = res.name
    formFields.description = res.description
    formFields.tax_percent = res.tax_percent
    formFields.category = res.category.id.toString()
    formFields.modifiers = res.modifiers
    productImagePath.value = res.image
  })
  store.commit('setLoadingStatus', false)
});

async function onSubmit() {
  isLoading.value = true
  externalErrors.value = {};
  try {
    const formData = new FormData()

    if (formFields.image)
      formData.append('image', formFields.image)
    formData.append('start', formFields.start)
    formData.append('end', formFields.end)
    formData.append('quickest_time', formFields.quickest_time)
    formData.append('square_id', formFields.square_id)
    formData.append('name', formFields.name)
    formData.append('description', formFields.description)
    formData.append('category', formFields.category)
    formData.append('tax_percent', formFields.tax_percent)

    for (let i = 0; i < formFields.sizes.length; i++) {
      formData.append('sizes[' + i + ']name', formFields.sizes[i].name)
      formData.append('sizes[' + i + ']price', formFields.sizes[i].price)
      formData.append('sizes[' + i + ']available', formFields.sizes[i].available)
      formData.append('sizes[' + i + ']default', formFields.sizes[i].default)
      formData.append('sizes[' + i + ']square_id', formFields.sizes[i].square_id)
    }

    for (let i = 0; i < formFields.modifiers.length; i++) {
      formData.append('modifiers', formFields.modifiers[i])
    }

    const res = await updateProduct({ id: route.params.id, data: formData });

    Toastify({
      node: cash('#success-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000,
    }).showToast();
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      externalErrors.value = error.response.data;
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Product Edit Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <form class="validate-form" @submit.prevent="onSubmit" enctype="multipart/form-data">
              <FormFields :form-fields="formFields" :product-image-path="productImagePath"
                :external-errors="externalErrors" @update:form-fields="formFields = $event" />
              <div class="flex pt-5 justify-end border-t border-gray-200 dark:border-dark-5">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <LoadingIcon v-if="isLoading" icon="tail-spin" class="w-4 h-4 mr-3" color="#fff" />
                  <!-- <RefreshCwIcon v-else class="mr-3" /> -->
                  <span>Update</span>
                </button>
              </div>
              <!-- <pre>{{ values }}</pre> -->
            </form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>
