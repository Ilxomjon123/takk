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
              <div class="flex flex-col md:flex-row gap-5">
                <div class="md:basis-1/2 lg:basis-1/3">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Product size info</h2>
                  </div>
                  <template v-for="(item, index) in product_sizes">
                    <div class="flex gap-5">
                      <div class="form-check basis-1/2">
                        <input
                          :id="'product_size_available' + index"
                          class="form-check-switch"
                          type="checkbox"
                          v-model="item.available"
                        />
                        <label
                          class="form-check-label"
                          :for="'product_size_available' + index"
                        >Available</label>
                      </div>
                      <div class="form-check basis-1/2">
                        <input
                          :id="'product_size_is_default' + index"
                          class="form-check-switch"
                          type="checkbox"
                          v-model="item.default"
                        />
                        <label
                          class="form-check-label"
                          :for="'product_size_is_default' + index"
                        >Default</label>
                      </div>
                    </div>
                    <div class="flex pt-5">
                      <div class="input-form">
                        <label
                          class="form-label"
                          :for="'product_size_name' + index"
                        >
                          Product size name
                          <span class="text-theme-6">*</span>
                        </label>
                        <input
                          :id="'product_size_name' + index"
                          v-model="item.name"
                          class="form-control"
                          type="text"
                        />
                        <span
                          class="text-theme-6 mt-2"
                        >{{ externalErrors.name }}</span>
                      </div>
                    </div>
                    <div class="flex gap-5 py-5">
                      <div class="input-form basis-1/2">
                        <label
                          class="form-label"
                          :for="'product_size_price' + index"
                        >
                          Product size price
                          <span class="text-theme-6">*</span>
                        </label>
                        <input
                          :id="'product_size_price' + index"
                          v-model="item.price"
                          class="form-control"
                          type="number"
                          step="0.01"
                        />
                        <span
                          class="text-theme-6 mt-2"
                        >{{ externalErrors.name }}</span>
                      </div>
                      <div class="input-form basis-1/2">
                        <label
                          class="form-label"
                          :for="'product_size_square_id' + index"
                        >Square id</label>
                        <input
                          :id="'product_size_square_id' + index"
                          v-model="item.square_id"
                          class="form-control"
                          type="text"
                        />
                        <span
                          class="text-theme-6 mt-2"
                        >{{ externalErrors.square_id }}</span>
                      </div>
                    </div>
                  </template>
                  <button
                    type="button"
                    class="btn btn-primary mb-5"
                    @click="addNewProductSize"
                  >
                    <span class="w-5 h-5 flex items-center justify-center">
                      <PlusIcon class="w-4 h-4" />
                    </span>
                    Add new size
                  </button>
                  <SimpleImageUpload
                    :title="productImage ? 'Change photo' : 'Add photo'"
                    :image-path="productImage"
                    @update-image-path="productImage = $event"
                  />
                </div>
                <div class="md:basis-1/2 lg:basis-2/3">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto">Product info</h2>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="product_name">
                        Product name
                        <span class="text-theme-6">*</span>
                      </label>
                      <input
                        id="product_name"
                        class="form-control"
                        v-model="productName"
                      />
                      <span class="text-theme-6 mt-2">{{ externalErrors.name }}</span>
                    </div>
                    <div class="input-form md:basis-1/2">
                      <label class="form-label" for="product_quickest_time">
                        Product quickest time
                        <span class="text-theme-6">*</span>
                      </label>
                      <input
                        id="product_quickest_time"
                        class="form-control"
                        v-model="productQuickestTime"
                      />
                      <span
                        name="call_center"
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.quickest_time }}</span>
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form lg:basis-1/2">
                      <label for="product_start_time" class="form-label">
                        Product start time
                        <span class="text-theme-6">*</span>
                      </label>
                      <input
                        id="product_start_time"
                        type="time"
                        class="form-control timepicker"
                        v-model="productStartTime"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.start_time }}</span>
                    </div>
                    <div class="input-form lg:basis-1/2">
                      <label for="product_end_time" class="form-label">
                        Product end time
                        <span class="text-theme-6">*</span>
                      </label>
                      <input
                        id="product_end_time"
                        type="time"
                        class="form-control timepicker"
                        v-model="productEndTime"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.end_time }}</span>
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form lg:basis-1/2">
                      <label
                        class="form-label"
                        for="product_square_id"
                      >Product square id</label>
                      <input
                        id="product_square_id"
                        v-model="productSquareId"
                        class="form-control"
                        type="text"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.square_id }}</span>
                    </div>
                    <div class="input-form lg:basis-1/2">
                      <label class="form-label" for="product_position">Position</label>
                      <input
                        id="product_position"
                        v-model="productPosition"
                        class="form-control"
                        type="text"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.position }}</span>
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form lg:basis-1/2">
                      <label
                        class="form-label"
                        for="product_tax_percent"
                      >Product tax percent</label>
                      <input
                        id="product_tax_percent"
                        v-model="productTaxPercent"
                        class="form-control"
                        type="text"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.tax_percent }}</span>
                    </div>
                    <div class="input-form lg:basis-1/2">
                      <label class="form-label" for="product_categories">
                        Product category
                        <span class="text-theme-6">*</span>
                      </label>
                      <TomSelect
                        id="product_categories"
                        v-model="productCategoryId"
                        :options="{
                          placeholder: 'Select product category'
                        }"
                      >
                        <option
                          v-for="item in productCategories"
                          :value="item.id"
                        >{{ item.name }}</option>
                      </TomSelect>
                    </div>
                  </div>
                  <div class="flex gap-5 pt-3">
                    <div class="input-form lg:basis-1/2">
                      <label
                        class="form-label"
                        for="product_modifiers"
                      >Product modifiers</label>
                      <TomSelect
                        id="product_modifiers"
                        v-model="productModifierIds"
                        :options="{
                          placeholder: 'Select product modifiers'
                        }"
                        multiple
                      >
                        <option
                          v-for="item in productModifiers"
                          :value="item.id"
                        >{{ item.name }}</option>
                      </TomSelect>
                    </div>
                  </div>
                  <div class="input-form mt-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                      id="description"
                      class="form-control"
                      placeholder="Type your product description"
                      v-model="productDescription"
                    />
                  </div>
                </div>
              </div>
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
            </form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Toastify from 'toastify-js';
import cash from 'cash-dom';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { useStore } from 'vuex';
import { computed, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue';
import { createProduct, fetchSelectedMenuCategories, fetchSelectedMenuModifiers } from '@/api';

const store = useStore()

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
  status: yup.boolean(),
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
  is_use_square: yup.boolean(), // ok
  square_location_id: yup.string(), // ok
  state: yup.string(), // ok
  // country: yup.string(), // ok
  // menu: yup.number().positive().integer()
});

const externalErrors = reactive({});
const isLoading = ref(false);

// product size data
let product_sizes = [
  {
    name: '',
    square_id: '',
    price: 0,
    available: false,
    default: false,
  }
];

// product data
const productStartTime = ref(null);
const productEndTime = ref(null);
const productQuickestTime = ref(null);
const productSquareId = ref('');
const productName = ref('');
const productDescription = ref('');
const productPosition = ref(null);
const productTaxPercent = ref(null);
const productCategoryId = ref(null);
const productModifierIds = ref([]);
const productImage = ref(null);

const activeMenuID = computed(() => store.getters['getSelectedMenuId']);

const productCategories = reactive([]);
const productModifiers = reactive([]);

onMounted(() => {
  store.commit('setLoadingStatus', true)
  fetchSelectedMenuCategories(activeMenuID.value).then((res) => Object.assign(productCategories, res.results))
  fetchSelectedMenuModifiers(activeMenuID.value).then((res) => Object.assign(productModifiers, res.results))
  store.commit('setLoadingStatus', false)
});

onBeforeUnmount(() => {
  //
});

async function onSubmit() {
  Object.assign(externalErrors, {})
  try {
    const requestObj = {}
    const formData = new FormData()
    formData.append('image', productImage.value)
    // for (let i = 0; i < product_sizes.value.length; i++) {
    //   formData.append('sizes[]', product_sizes.value[i])
    // }
    // formData.append('sizes', JSON.stringify(toRefs(product_sizes.value)))
    // formData.append('start', productStartTime.value)
    // formData.append('end', productEndTime.value)
    // formData.append('quickest_time', productQuickestTime.value)
    // formData.append('square_id', productSquareId.value)
    // formData.append('name', productName.value)
    // formData.append('description', productDescription.value)
    // formData.append('position', productPosition.value)
    // formData.append('tax_percent', productTaxPercent.value)
    // formData.append('category', productCategoryId.value)
    // formData.append('modifiers', productModifierIds.value)
    // console.log('formData: ', Object.fromEntries(formData));
    // const res = await createProduct(JSON.stringify(formData.values));
    requestObj.sizes = [...product_sizes]
    requestObj.start = productStartTime.value
    requestObj.end = productEndTime.value
    requestObj.quickest_time = productQuickestTime.value
    requestObj.square_id = productSquareId.value
    requestObj.name = productName.value
    requestObj.description = productDescription.value
    requestObj.position = productPosition.value
    requestObj.tax_percent = productTaxPercent.value
    requestObj.category = productCategoryId.value
    requestObj.modifiers = productModifierIds.value
    console.log('requestObj: ', requestObj);
    const res = await createProduct(requestObj);

    if (res.status) {
      Toastify({
        node: cash('#success-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
      }).showToast();
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      Object.assign(externalErrors, error.response.data);
    }
  } finally {
    isLoading.value = false
  }
}

function addNewProductSize() {
  product_sizes.push(product_sizes[0])
}

</script>

<style lang="scss" scoped>
//
</style>
