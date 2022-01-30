<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Create Form</h2>
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
              v-slot="{ values }"
            >
              <div class="flex flex-col md:flex-row gap-5">
                <div class="flex-1">
                  <SimpleImageUpload
                    :image-path="logoPath"
                    @update-image-path="logoPath = $event"
                  />
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe weeek time</h2>
                  </div>
                  <WeekDayTimeForm
                    v-for="day, index in weekTime"
                    :key="day.day"
                    :day="day"
                    @update:opening_time="weekTime[index]['opening_time'] = $event"
                    @update:closing_time="weekTime[index]['closing_time'] = $event"
                    @update:is_open="weekTime[index]['is_open'] = $event"
                  />
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe delivery info</h2>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form basis-1/2">
                      <label for="tax_rate" class="form-label">Tax rate</label>
                      <Field
                        id="tax_rate"
                        name="tax_rate"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage name="tax_rate" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form basis-1/2">
                      <label for="order_limit" class="form-label">Order limit</label>
                      <Field
                        id="order_limit"
                        name="order_limit"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage
                        name="order_limit"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form basis-1/2">
                      <label
                        for="order_time_limit"
                        class="form-label"
                      >Order time limit</label>
                      <Field
                        id="order_time_limit"
                        name="order_time_limit"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage
                        name="order_time_limit"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                    <div class="input-form basis-1/2">
                      <label for="version" class="form-label">Version</label>
                      <Field
                        id="version"
                        name="version"
                        class="form-control"
                        type="number"
                      />
                      <ErrorMessage name="version" class="text-theme-6 mt-2" />
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="form-check w-auto mt-6">
                      <Field
                        id="is_square_used"
                        name="is_use_square"
                        class="form-check-switch"
                        type="checkbox"
                        :value="false"
                        @input="toggleFunc1"
                      />
                      <ErrorMessage
                        name="is_use_square"
                        class="text-theme-6 mt-2"
                      />
                      <label
                        class="form-check-label"
                        for="is_square_used"
                      >Is square used</label>
                    </div>
                    <div class="input-form" v-if="isSquareUsed === true">
                      <label
                        for="square_location_id"
                        class="form-label"
                      >Square location id</label>
                      <Field
                        id="square_location_id"
                        name="square_location_id"
                        class="form-control"
                      />
                      <ErrorMessage
                        name="square_location_id"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <CafeDeliveryFields :delivery="schema.fields.delivery" />
                </div>
                <div class="flex-1">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Cafe info</h2>
                  </div>
                  <div class="input-form mt-3">
                    <label class="form-label" for="name">Cafe name</label>
                    <Field id="name" name="name" class="form-control" />
                    <ErrorMessage name="name" class="text-theme-6 mt-2" />
                  </div>
                  <div class="input-form mt-3">
                    <label class="form-label" for="call_center">Phone number</label>
                    <Field
                      id="call_center"
                      name="call_center"
                      class="form-control"
                    />
                    <ErrorMessage name="call_center" class="text-theme-6 mt-2" />
                  </div>
                  <div class="input-form mt-3">
                    <label class="form-label" for="website">Website</label>
                    <Field id="website" name="website" class="form-control" />
                    <ErrorMessage name="website" class="text-theme-6 mt-2" />
                  </div>
                  <div class="input-form mt-3">
                    <label for="cafe_status" class="form-label">Status</label>
                    <Field name="status">
                      <TomSelect id="cafe_status">
                        <option
                          v-for="(item, index) in statusOptions"
                          :key="item.label + index"
                          :value="item.value"
                        >{{ item.label }}</option>
                      </TomSelect>
                    </Field>
                    <ErrorMessage name="status" class="text-theme-6 mt-2" />
                  </div>
                  <div class="input-form mt-3">
                    <label for="country" class="form-label">Country</label>
                    <Field name="country" class="form-control">
                      <CountrySelect id="country" />
                    </Field>
                    <ErrorMessage name="country" class="text-theme-6 mt-2" />
                  </div>
                  <div class="input-form mt-3">
                    <label for="city" class="form-label">City</label>
                    <Field name="city" class="form-control">
                      <CitySelect />
                    </Field>
                    <ErrorMessage name="city" class="text-theme-6 mt-2" />
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form">
                      <label class="form-label" for="state">State</label>
                      <Field
                        id="state"
                        name="state"
                        class="form-control"
                        placeholder="Type state"
                      />
                      <ErrorMessage name="state" class="text-theme-6 mt-2" />
                    </div>
                    <div class="input-form">
                      <label class="form-label" for="postal_code">Postal code</label>
                      <Field
                        id="postal_code"
                        name="postal_code"
                        class="form-control"
                        placeholder="Type postal code"
                      />
                      <ErrorMessage
                        name="postal_code"
                        class="text-theme-6 mt-2"
                      />
                    </div>
                  </div>
                  <div class="input-form mt-3">
                    <label class="form-label" for="address">Address</label>
                    <Field
                      id="address"
                      name="address"
                      class="form-control"
                      placeholder="Type address"
                    />
                    <ErrorMessage name="address" class="text-theme-6 mt-2" />
                  </div>
                  <div class="input-form mt-3">
                    <label
                      class="form-label"
                      for="second_address"
                    >Second address</label>
                    <Field
                      id="second_address"
                      name="second_address"
                      class="form-control"
                      placeholder="Type second address"
                    />
                    <ErrorMessage
                      name="second_address"
                      class="text-theme-6 mt-2"
                    />
                  </div>
                  <div class="input-form mt-3">
                    <label for="description" class="form-label">Description</label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      class="form-control"
                      placeholder="Type your cafe description"
                    ></Field>
                    <ErrorMessage name="description" class="text-theme-6 mt-2" />
                  </div>
                  <LatLongField
                    :location="location"
                    @update:latitude-value="schema.fields.location.lat = $event"
                    @update:longitude-value="schema.fields.location.lon = $event"
                  />
                  <ErrorMessage name="location" />
                </div>
              </div>
              <div class="flex">
                <button
                  class="btn btn-primary mt-5 lg:ml-auto"
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
              <pre>{{ values }}</pre>
            </Form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import DynamicForm from '../../components/forms/DynamicForm.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import LatLongField from '@/components/forms/cafes/LatLongField.vue';
import CafeDeliveryFields from '@/components/forms/cafes/CafeDeliveryFields.vue';
import TextInput from '../../components/forms/TextInput.vue';

export default defineComponent({
  components: {
    DynamicForm,
    Form,
    Field,
    ErrorMessage,
    SimpleImageUpload,
    CountrySelect,
    CitySelect,
    WeekDayTimeForm,
    LatLongField,
    CafeDeliveryFields,
    TextInput
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().min(1, "Please enter a name more than 1 character").required("This field is requried"), // ok
      // logo: yup.object({}),
      description: yup.string().min(1, "Must be more than 1 characters").required("This field is requried"), // ok
      location: yup.object({
        lat: yup
          .number()
          .min(-90, 'Must be more than -90')
          .max(90, "Must be less than 90")
          .required("This field is requried")
          .default(35.1234),
        lon: yup
          .number()
          .min(-180, 'Must be more than -180')
          .max(180, "Must be less than 180")
          .required("This field is requried")
          .default(-95.1234)
      }),
      call_center: yup.string().max(50, "Must be less than 50 characters").required("This field is requried"), // ok
      website: yup.string().url("Must be a url address").nullable(), // ok
      status: yup.number().positive().integer().default(1).required("This field is requried"),
      state: yup.string(), // ok
      postal_code: yup.string().max(12, "Must be less than 12 characters"), // ok
      address: yup.string(), // ok
      second_address: yup.string(), // ok
      tax_rate: yup.number().positive().required("This field is requried"), // ok
      delivery: yup.object({
        delivery_available: yup.boolean().default(false),
        delivery_max_distance: yup.number().positive().integer().default(1),
        delivery_min_amount: yup.number().positive().integer().default(50),
        delivery_fee: yup.number().positive().integer().default(3),
        delivery_percent: yup.number().positive().integer().default(10),
        delivery_km_amount: yup.number().positive().integer().default(0),
        delivery_min_time: yup.number().positive().integer().default(30)
      }),
      version: yup.number().positive().integer().required("This field is requried"), // ok
      order_limit: yup.number().positive().integer().required("This field is requried"), // ok
      order_time_limit: yup.number().positive().integer().required("This field is requried"), // ok
      is_use_square: yup.boolean().default(false), // wrong value
      // is_use_square: (value) => value === 'on' ? true : false,
      square_location_id: yup.string(), // ok
      // menu: yup.number().positive().integer()
    });

    const isLoading = ref(false)
    const isSquareUsed = ref(false);
    const statusOptions = reactive([
      { label: 'Inactive', value: 0 },
      { label: 'Active', value: 1 },
      { label: 'Unknown', value: 2 }
    ]);

    const location = reactive({
      lat: 35.1234,
      lon: -95.1234,
    })

    const weekTime = reactive([
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
    ])

    return {
      schema,
      isLoading,
      logoPath: '',
      statusOptions,
      weekTime,
      location,
      isSquareUsed
    };
  },
  methods: {
    submit(values) {
      console.log('values: ');
      console.log(values);
    },
    toggleFunc1(e) {
      this.isSquareUsed = e.target.checked ? true : false;
    }
  },
});
</script>
