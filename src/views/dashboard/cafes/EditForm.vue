<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Edit Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <Form class="validate-form" @submit="submit" :validation-schema="schema" @invalid-submit="invalidSubmit"
              v-slot="{ values }">
              <FormFields :form-fields="formFields" :external-errors="externalErrors"
                @update:form-fields="formFields = $event" />
              <div class="flex pt-5 gap-5 justify-between md:justify-end border-t border-gray-200 dark:border-dark-5">
                <button type="button" class="btn btn-danger" :disabled="isLoading" @click="openConfirmModal">
                  <span>Delete</span>
                </button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <LoadingIcon v-if="isLoading" icon="tail-spin" class="w-4 h-4 mr-3" color="#fff" />
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
    <!-- BEGIN: Delete Confirmation Modal -->
    <div id="delete-confirmation-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these records?
                <br />This process cannot be undone.
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 mr-1">Cancel</button>
              <button type="button" class="btn btn-danger w-24" @click="deleteObj">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Delete Confirmation Modal -->
  </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as yup from 'yup';
import Toastify from 'toastify-js';
import { updateCafe, fetchCafe, fetchCafeWorkDays, addCafeGallery, updateCafeWorkDays } from '@/api';
import cash from 'cash-dom';
import FormFields from './FormFields.vue';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

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
  // version: yup.number().positive().integer(), // ok
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
  // state: yup.string(), // ok
  // country: yup.string(), // ok
  // menu: yup.number().positive().integer()
});

const store = useStore();
const route = useRoute();
const router = useRouter();
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
  status: 0,
  country: 'United States'
});

onMounted(async () => {
  store.commit('setLoadingStatus', true);

  await fetchCafe(route.params.id).then(res => {
    if (res.country) {
      formFields.country = res.country
      store.commit('setSelectedCountry', res.country);
      store.dispatch('fetchCitiesByCountry', res.country)
    }

    formFields.address = res.address
    formFields.cafe_timezone = res.cafe_timezone
    formFields.call_center = res.call_center
    formFields.city = res.city
    formFields.delivery_available = res.delivery_available
    formFields.delivery_fee = res.delivery_fee
    formFields.delivery_km_amount = res.delivery_km_amount
    formFields.delivery_max_distance = res.delivery_max_distance
    formFields.delivery_min_amount = res.delivery_min_amount
    formFields.delivery_min_time = res.delivery_min_time
    formFields.delivery_percent = res.delivery_percent
    formFields.description = res.description
    formFields.is_use_square = res.is_use_square
    formFields.location.lat = res.location.lat
    formFields.location.lon = res.location.lon
    formFields.menu = res.menu
    formFields.name = res.name
    formFields.order_limit = res.order_limit
    formFields.order_time_limit = res.order_time_limit
    formFields.postal_code = res.postal_code
    formFields.second_address = res.second_address
    formFields.square_location_id = res.square_location_id
    formFields.state = res.state
    formFields.status = res.status
    formFields.tax_rate = res.tax_rate
    // formFields.version = res.version
    formFields.website = res.website
  })

  await fetchCafeWorkDays(route.params.id).then(res => {
    res.forEach((resItem, resItemIndex) => {
      formFields.week_time.forEach((weekDay, weekDayIndex) => {
        if (weekDay.day === resItem.day) {
          formFields.week_time[weekDayIndex] = resItem
        }
      })
    })
  });
  store.commit('setLoadingStatus', false);
})

async function submit(values) {
  isLoading.value = true
  externalErrors.value = {}
  console.log('formFields: ', formFields);
  console.log('values: ', values);

  try {
    const res1 = await updateCafe({ data: formFields, id: route.params.id })
    const res2 = await updateCafeWorkDays({ data: { week_time: formFields.week_time }, id: route.params.id })

    if (formFields.upload_photos.length > 0) {
      const imagesFormData = new FormData()
      for (let image of formFields.upload_photos) {
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

function openConfirmModal() {
  cash('#delete-confirmation-modal').modal('show')
}

async function deleteObj() {
  store.commit('setLoadingStatus', true)
  cash('#delete-confirmation-modal').modal('hide')
  await deleteCafe(route.params.id)
  router.push('/dashboard/cafe-data-list')
}

</script>
