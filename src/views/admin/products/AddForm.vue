<script setup>
import { reactive, ref } from 'vue';
import { createProduct } from '@/api/admin';
import FormFields from './FormFields.vue';
import { useRouter } from 'vue-router';
import { useNotyf } from '@/composables/useNotyf';
import SubmitButton from '@/components/buttons/SubmitButton.vue';

const router = useRouter();
const notyf = useNotyf();
const externalErrors = reactive({});
const isLoading = ref(false);
const productImagePath = ref('');

const formFields = reactive({
  sizes: [
    {
      name: '',
      // square_id: '',
      price: 0,
      available: true,
      default: false,
    },
  ],
  modifiers: [],
  quickest_time: 5,
  tax_percent: '100',
});

async function onSubmit() {
  isLoading.value = true;
  Object.assign(externalErrors, {});

  try {
    const formData = new FormData();

    formData.append('image', formFields.image);
    formData.append('start', formFields.start);
    formData.append('end', formFields.end);
    formData.append('quickest_time', formFields.quickest_time);
    formData.append('name', formFields.name);
    formData.append('description', formFields.description);
    formData.append('category', formFields.category);
    formData.append('tax_percent', formFields.tax_percent);

    for (let i = 0; i < formFields.sizes.length; i++) {
      formData.append('sizes[' + i + ']name', formFields.sizes[i].name);
      formData.append('sizes[' + i + ']price', formFields.sizes[i].price);
      formData.append(
        'sizes[' + i + ']available',
        formFields.sizes[i].available
      );
      formData.append('sizes[' + i + ']default', formFields.sizes[i].default);
    }

    for (let i = 0; i < formFields.modifiers.length; i++) {
      formData.append('modifiers', formFields.modifiers[i]);
    }

    const res = await createProduct(formData);

    notyf.success();
    router.push('/admin/products');
  } catch (error) {
    Object.assign(externalErrors, error.response.data);
    notyf.error();
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Product Add Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <form
              class="validate-form"
              @submit.prevent="onSubmit"
              enctype="multipart/form-data"
            >
              <FormFields
                :form-fields="formFields"
                :product-image-path="productImagePath"
                :external-errors="externalErrors"
                @update:form-fields="formFields = $event"
              />
              <div
                class="flex pt-5 justify-end border-t border-gray-200 dark:border-dark-5"
              >
                <SubmitButton :is-loading="isLoading" />
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
