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
                    <h2 class="font-medium text-base mr-auto">Product image</h2>
                  </div>
                  <SimpleImageUpload
                    :title="productImage ? 'Change photo' : 'Add photo'"
                    :image-path="productImage"
                    @update-image-path="productImage = $event"
                  />
                  <span
                    class="text-theme-6 mt-2"
                  >{{ externalErrors.image && externalErrors.image[0] }}</span>
                  <div
                    class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
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
                    <div class="pt-5">
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
                        >{{ externalErrors.sizes && externalErrors.sizes[0] }}</span>
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
                        >{{ externalErrors.sizes && externalErrors.sizes[0] }}</span>
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
                        <!-- <span
                          class="text-theme-6 mt-2"
                        >{{ externalErrors.square_id }}</span>-->
                      </div>
                    </div>
                  </template>
                  <div class="flex pb-5 w-full justify-between">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addNewProductSize"
                    >
                      <PlusIcon />Add new size
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="removeProductSize"
                      :disabled="product_sizes.length === 1"
                    >
                      <TrashIcon />Remove size
                    </button>
                  </div>
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
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.name && externalErrors.name[0] }}</span>
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
                      >{{ externalErrors.quickest_time && externalErrors.quickest_time[0] }}</span>
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
                      >{{ externalErrors.start && externalErrors.start[0] }}</span>
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
                      >{{ externalErrors.end && externalErrors.end[0] }}</span>
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
                      >{{ externalErrors.square_id && externalErrors.square_id[0] }}</span>
                    </div>
                    <div class="input-form lg:basis-1/2">
                      <label class="form-label" for="product_position">Position</label>
                      <input
                        id="product_position"
                        v-model="productPosition"
                        class="form-control"
                        type="number"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.position && externalErrors.position[0] }}</span>
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
                        type="number"
                      />
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.tax_percent && externalErrors.tax_percent[0] }}</span>
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
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.category && externalErrors.category[0] }}</span>
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
                      <span
                        class="text-theme-6 mt-2"
                      >{{ externalErrors.modifiers && externalErrors.modifiers[0] }}</span>
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
                    <span
                      class="text-theme-6 mt-2"
                    >{{ externalErrors.description && externalErrors.description[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="flex pt-5">
                <button
                  type="submit"
                  class="btn btn-primary lg:ml-auto"
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
import Toastify from 'toastify-js';
import cash from 'cash-dom';
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { useStore } from 'vuex';
import { computed, onBeforeUnmount, onMounted, reactive, ref, toRaw, toRefs } from 'vue';
import { createProduct, fetchSelectedMenuCategories, fetchSelectedMenuModifiers } from '@/api';

const store = useStore()
const externalErrors = reactive({});
const isLoading = ref(false);

// product size data
const product_sizes = ref([
  {
    name: '',
    square_id: '',
    price: 0,
    available: false,
    default: false,
  }
]);

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
    const formData = new FormData()
    formData.append('image', productImage.value)
    formData.append('sizes', JSON.stringify(product_sizes.value))
    formData.append('start', productStartTime.value)
    formData.append('end', productEndTime.value)
    formData.append('quickest_time', productQuickestTime.value)
    formData.append('square_id', productSquareId.value)
    formData.append('name', productName.value)
    formData.append('description', productDescription.value)
    formData.append('position', productPosition.value)
    formData.append('tax_percent', productTaxPercent.value)
    formData.append('category', productCategoryId.value)
    formData.append('modifiers', JSON.stringify(productModifierIds.value.map(item => Number(item))))
    const res = await createProduct(formData);

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
  product_sizes.value.push({ ...product_sizes.value[0] })
}

function removeProductSize() {
  product_sizes.value.pop()
}
</script>
