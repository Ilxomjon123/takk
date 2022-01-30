<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="flex-1">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe info</h2>
      </div>
      <TextField
        title="Cafe name"
        v-model="formData.name"
        :error="validate.name?.$error"
        :errors="validate.name?.$errors"
      />
      <TextField
        title="Phone number"
        v-model="formData.call_center"
        :error="validate.call_center?.$error"
        :errors="validate.call_center?.$errors"
      />
      <TextField
        title="Website"
        v-model="formData.website"
        :error="validate.website?.$error"
        :errors="validate.website?.$errors"
      />
      <div class="input-form mt-3">
        <label for="cafe_status" class="form-label">Status</label>
        <TomSelect
          id="cafe_status"
          v-model="formData.status"
          @update="formData.status = $event"
        >
          <option
            v-for="(item, index) in statusOptions"
            :key="item.label + index"
            :value="item.value"
          >{{ item.label }}</option>
        </TomSelect>
      </div>
      <div class="input-form mt-3">
        <label
          for="country"
          class="form-label w-full flex flex-col sm:flex-row"
        >Country</label>
        <CountrySelect v-model="formData.country" />
      </div>
      <div class="input-form mt-3">
        <label
          for="city"
          class="form-label w-full flex flex-col sm:flex-row"
        >City</label>
        <CitySelect v-model="formData.city" />
      </div>
      <div class="flex gap-5 pt-3">
        <TextField
          title="State"
          v-model="formData.state"
          :error="validate.state?.$error"
          :errors="validate.state?.$errors"
          class="basis-1/2"
        />
        <TextField
          title="Postal code"
          v-model="formData.postal_code"
          :error="validate.postal_code?.$error"
          :errors="validate.postal_code?.$errors"
          class="basis-1/2"
        />
      </div>
      <TextField
        title="Address"
        v-model="formData.address"
        :error="validate.address?.$error"
        :errors="validate.address?.$errors"
        class="basis-1/2"
      />
      <TextField
        title="Second address"
        v-model="formData.second_address"
        :error="validate.second_address?.$error"
        :errors="validate.second_address?.$errors"
        class="basis-1/2"
      />
      <div class="input-form mt-3">
        <label
          for="description"
          class="form-label w-full flex flex-col sm:flex-row"
        >Description</label>
        <textarea
          id="description"
          v-model.trim="formData.description"
          class="form-control"
          :class="{ 'border-theme-6': validate.description?.$error }"
          placeholder="Type your cafe description"
        ></textarea>
        <template v-if="validate.description?.$error">
          <div
            v-for="(error, index) in validate.description?.$errors"
            :key="index"
            class="text-theme-6 mt-2"
          >{{ error.$message }}</div>
        </template>
      </div>
    </div>
    <div class="flex-1">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe weeek time</h2>
      </div>
      <WeekDayTimeForm
        v-for="day, index in formData.week_time"
        :key="day.day"
        :day="day"
        @update:opening_time="formData.week_time[index]['opening_time'] = $event"
        @update:closing_time="formData.week_time[index]['closing_time'] = $event"
        @update:is_open="formData.week_time[index]['is_open'] = $event"
      />
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Cafe delivery info</h2>
      </div>
      <div class="flex gap-5">
        <div class="input-form mt-3 basis-1/2">
          <label
            for="tax_rate"
            class="form-label w-full flex flex-col sm:flex-row"
          >Tax rate</label>
          <input
            id="tax_rate"
            v-model.trim="formData.tax_rate"
            type="number"
            class="form-control"
            :class="{ 'border-theme-6': validate.tax_rate?.$error }"
            placeholder="Type.."
          />
          <template v-if="validate.tax_rate?.$error">
            <div
              v-for="(error, index) in validate.tax_rate?.$errors"
              :key="index"
              class="text-theme-6 mt-2"
            >{{ error.$message }}</div>
          </template>
        </div>
        <div class="input-form mt-3 basis-1/2">
          <label
            for="order_limit"
            class="form-label w-full flex flex-col sm:flex-row"
          >Order limit</label>
          <input
            id="order_limit"
            v-model.trim="formData.order_limit"
            type="number"
            class="form-control"
            :class="{
              'border-theme-6': validate.order_limit?.$error
            }"
            placeholder="Type order limit"
          />
          <template v-if="validate.order_limit?.$error">
            <div
              v-for="(error, index) in validate.order_limit?.$errors"
              :key="index"
              class="text-theme-6 mt-2"
            >{{ error.$message }}</div>
          </template>
        </div>
      </div>
      <div class="flex gap-5">
        <div class="input-form mt-3 basis-1/2">
          <label
            for="order_time_limit"
            class="form-label w-full flex flex-col sm:flex-row"
          >Order time limit</label>
          <input
            id="order_time_limit"
            v-model.trim="formData.order_time_limit"
            type="text"
            class="form-control"
            :class="{
              'border-theme-6': validate.order_time_limit?.$error
            }"
            placeholder="Type order time limit"
          />
          <template v-if="validate.order_time_limit?.$error">
            <div
              v-for="(error, index) in validate.order_time_limit?.$errors"
              :key="index"
              class="text-theme-6 mt-2"
            >{{ error.$message }}</div>
          </template>
        </div>
        <div class="input-form mt-3 basis-1/2">
          <label
            for="version"
            class="form-label w-full flex flex-col sm:flex-row"
          >Version</label>
          <input
            id="version"
            v-model.trim="formData.version"
            type="number"
            class="form-control"
            :class="{ 'border-theme-6': validate.version?.$error }"
            placeholder="Type a version"
          />
          <template v-if="validate.version?.$error">
            <div
              v-for="(error, index) in validate.version?.$errors"
              :key="index"
              class="text-theme-6 mt-2"
            >{{ error.$message }}</div>
          </template>
        </div>
      </div>
      <div class="flex gap-5 pt-3">
        <div class="form-check w-auto mt-6">
          <input
            id="is_square_used"
            class="form-check-switch"
            type="checkbox"
            v-model.trim="formData.is_use_square"
          />
          <label class="form-check-label" for="is_square_used">Is square used</label>
        </div>
        <div class="input-form" v-if="formData.is_use_square">
          <label
            for="square_location_id"
            class="form-label w-full flex flex-col sm:flex-row"
          >Square location id</label>
          <input
            id="square_location_id"
            v-model.trim="formData.square_location_id"
            type="text"
            class="form-control"
            placeholder="Type.."
          />
        </div>
      </div>
      <CafeDeliveryFields :delivery="formData.delivery" />
    </div>
  </div>
  <LatLongField
    :location="formData.location"
    @update:latitude-value="validate.location.lat.$model = $event"
    @update:longitude-value="validate.location.lon.$model = $event"
    :latErrors="validate.location.lat.$errors"
    :lonErrors="validate.location.lon.$errors"
    :locationErrors="externalErrors.location"
  />
  <SimpleImageUpload
    :image-path="formData.logo"
    @update-image-path="validate.logo.$model = $event"
  />
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';
import {
  required,
  minLength,
  maxLength,
  url,
  integer,
  maxValue,
  minValue,
  helpers
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import CountrySelect from '@/components/selects/CountrySelect.vue';
import CitySelect from '@/components/selects/CitySelect.vue';
import WeekDayTimeForm from '@/components/forms/cafes/WeekDayTimeForm.vue';
import LatLongField from '@/components/forms/cafes/LatLongField.vue';
import CafeDeliveryFields from '@/components/forms/cafes/CafeDeliveryFields.vue';
import TextField from '../../components/forms/cafes/TextField.vue';
import StatusSelect from '../../components/forms/cafes/CafeStatusSelect.vue';
import MultipleImageUpload from '../../components/forms/file-upload/MultipleImageUpload.vue';
import SimpleImageUpload from '../../components/forms/file-upload/SimpleImageUpload.vue';

const props = defineProps({
  formData: Object,
  validate: Object,
  externalErrors: Object,
});

const externalErrors = ref(props.externalErrors || {})
const statusOptions = reactive([
  { label: 'Inactive', value: 0 },
  { label: 'Active', value: 1 },
  { label: 'Unknown', value: 2 }
]);

const formData = reactive({
  name: '',
  logo: '',
  description: '',
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
  location: {
    lat: 37.0902,
    lon: -95.7129
  },
  call_center: null,
  website: '',
  status: 1,
  country: 'United States',
  city: '',
  state: '',
  postal_code: '',
  address: '',
  second_address: '',
  tax_rate: null,
  delivery: {
    delivery_available: false,
    delivery_max_distance: 1,
    delivery_min_amount: 50,
    delivery_fee: 3,
    delivery_percent: 10,
    delivery_km_amount: 0,
    delivery_min_time: 30
  },
  version: '',
  order_limit: '',
  order_time_limit: '',
  is_use_square: false,
  square_location_id: '',
  menu: ''
});

const rules = {
  name: {
    required,
    minLength: minLength(1)
  },
  logo: { required },
  description: { required, minLength: minLength(1) },
  location: {
    lat: { required, maxValue: maxValue(90), minValue: minValue(-90) },
    lon: { required, maxValue: maxValue(180), minValue: minValue(-180) }
  },
  call_center: { required, maxLength: maxLength(50) },
  website: { url },
  status: { required },
  postal_code: { maxLength: maxLength(12) },
  tax_rate: { required },
  version: { required },
  order_limit: { required },
  order_time_limit: { required },
};

const validate = useVuelidate(rules, formData);

const emits = defineEmits(['update:validate', 'update:formData']);
emits('update:validate', validate.value);
emits('update:formData', toRefs(formData));

</script>
