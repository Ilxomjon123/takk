<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Add Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <Form
              class="validate-form"
              @submit="submit"
              :validation-schema="schema"
              @invalid-submit="invalidSubmit"
              v-slot="{ values }"
            >
              <FormFields
                :form-fields="formFields"
                :external-errors="externalErrors"
                @update:form-fields="formFields = $event"
              />
              <div class="flex pt-5">
                <button
                  type="button"
                  class="btn btn-danger lg:ml-auto mr-5"
                  :disabled="isLoading"
                  @click="openConfirmModal"
                >
                  <span>Delete</span>
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isLoading"
                >
                  <LoadingIcon
                    v-if="isLoading"
                    icon="tail-spin"
                    class="w-4 h-4 mr-3"
                    color="#fff"
                  />
                  <span>Save</span>
                </button>
              </div>
              <!-- <pre>{{ values }}</pre> -->
            </Form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Toastify from 'toastify-js';
import { cafePost, addCafeGallery } from '@/api';
import cash from 'cash-dom';
import FormFields from './FormFields.vue';
import { reactive, ref } from 'vue';

const schema = yup.object().shape({
  name: yup.string().min(1, "Please enter a name more than 1 character").required("This field is requried"), // ok
  description: yup.string(), // ok
  location: yup.object({
    lat: yup
      .number()
      .typeError('must be a decimal number')
      .min(-90, 'Must be more than -90')
      .max(90, "Must be less than 90")
      .required("This field is requried")
      .default(35.1234),
    lon: yup
      .number()
      .typeError('must be a decimal number')
      .min(-180, 'Must be more than -180')
      .max(180, "Must be less than 180")
      .required("This field is requried")
      .default(-95.1234)
  }), // ok
  call_center: yup.string().max(50, "Must be less than 50 characters").required("This field is requried"), // ok
  website: yup.string().url("Must be a url address").nullable(), // ok
  // status: yup.boolean(),
  postal_code: yup.string().max(12, "Must be less than 12 characters"), // ok
  tax_rate: yup.number().positive().required("This field is requried"), // ok
  version: yup.number().positive().integer(), // ok
  order_limit: yup.number().positive().integer().required("This field is requried"), // ok
  order_time_limit: yup.number().positive().integer().required("This field is requried"), // ok
  address: yup.string(), // ok
  second_address: yup.string(), // ok
  // delivery: yup.object({
  //   delivery_available: yup.boolean(), // ok
  //   delivery_max_distance: yup.number().positive().integer().default(1),
  //   delivery_min_amount: yup.number().positive().integer().default(50),
  //   delivery_fee: yup.number().positive().integer().default(3),
  //   delivery_percent: yup.number().positive().integer().default(10),
  //   delivery_km_amount: yup.number().integer().default(0),
  //   delivery_min_time: yup.number().positive().integer().default(30)
  // }),
  // is_use_square: yup.boolean(), // ok
  square_location_id: yup.string(), // ok
  state: yup.string(), // ok
  // country: yup.string(), // ok
  // menu: yup.number().positive().integer()
});

const isLoading = ref(false);
const externalErrors = reactive({});
const formFields = reactive({
  location: {
    lat: 35.1234,
    lon: -95.1234
  },
  delivery_available: false,
  delivery_max_distance: 1,
  delivery_min_amount: 50,
  delivery_fee: 3,
  delivery_percent: 10,
  delivery_km_amount: 0,
  delivery_min_time: 30,
  week_time: [
    {
      day: 'monday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'tuesday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'wednesday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'thursday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'friday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'saturday',
      opening_time: null,
      closing_time: null,
      is_open: false
    },
    {
      day: 'sunday',
      opening_time: null,
      closing_time: null,
      is_open: false
    }
  ],
  cafe_timezone: 'America/New_York',
  status: 0
});

async function submit(values) {
  isLoading.value = true
  externalErrors.value = {}
  console.log('formFields: ', formFields);
  console.log('values: ', values);

  const { upload_photos, ...restData } = formFields;

  try {
    const res1 = await cafePost(restData)

    if (upload_photos.length > 0) {
      const imagesFormData = new FormData()
      for (let image of upload_photos) {
        imagesFormData.append('images', image)
      }
      imagesFormData.append('cafe', res1.id);
      await addCafeGallery(imagesFormData);
    }

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

function invalidSubmit() {
  Toastify({
    node: cash('#failed-notification-content')
      .clone()
      .removeClass('hidden')[0],
    duration: 3000,
  }).showToast('asdjajsd sadlkasldkja');
}

</script>
