<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="lg:basis-1/3">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Product image</h2>
      </div>
      <SimpleImageUpload
        :title="productImagePath ? 'Change photo' : 'Add photo'"
        :image-path="productImagePath"
        @update-image-file="formFields.image = $event"
      />
      <span
        class="text-theme-6 mt-2"
      >{{ externalErrors.image && externalErrors.image[0] }}</span>
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Product size info</h2>
      </div>
      <template v-for="(item, index) in formFields.sizes">
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
            <label class="form-label" :for="'product_size_name' + index">
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
        <div class="flex flex-col lg:flex-row gap-5 py-5">
          <div class="input-form basis-1/2">
            <label class="form-label" :for="'product_size_price' + index">
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
          <!-- <div class="input-form basis-1/2">
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
          </div>-->
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
          :disabled="formFields.sizes.length === 1"
        >
          <TrashIcon />Remove size
        </button>
      </div>
    </div>
    <div class="lg:basis-1/2 lg:basis-2/3">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Product info</h2>
      </div>
      <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_name">
            Product name
            <span class="text-theme-6">*</span>
          </label>
          <input
            id="product_name"
            class="form-control"
            v-model="formFields.name"
          />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.name && externalErrors.name[0] }}</span>
        </div>
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_quickest_time">
            Preparation time
            <span class="text-theme-6">*</span>
          </label>
          <div class="input-group">
            <input
              id="product_quickest_time"
              class="form-control"
              v-model="formFields.quickest_time"
              aria-describedby="input-group-quickesttime"
            />
            <div id="input-group-quickesttime" class="input-group-text">mins</div>
          </div>
          <span
            name="call_center"
            class="text-theme-6 mt-2"
          >{{ externalErrors.quickest_time && externalErrors.quickest_time[0] }}</span>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form lg:basis-1/2">
          <label for="product_start_time" class="form-label">
            Product start time
            <span class="text-theme-6">*</span>
          </label>
          <input
            id="product_start_time"
            type="time"
            class="form-control timepicker"
            v-model="formFields.start"
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
            v-model="formFields.end"
          />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.end && externalErrors.end[0] }}</span>
        </div>
      </div>
      <!-- <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_square_id">Product square id</label>
          <input
            id="product_square_id"
            v-model="formFields.square_id"
            class="form-control"
            type="text"
          />
          <span
            class="text-theme-6 mt-2"
          >{{ externalErrors.square_id && externalErrors.square_id[0] }}</span>
        </div>
      </div>-->
      <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form lg:basis-1/2">
          <label
            class="form-label"
            for="product_tax_percent"
          >Product tax percent</label>
          <input
            id="product_tax_percent"
            v-model="formFields.tax_percent"
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
            v-model="formFields.category"
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
      <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_modifiers">Product modifiers</label>
          <TomSelect
            id="product_modifiers"
            v-model="formFields.modifiers"
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
          v-model="formFields.description"
        />
        <span
          class="text-theme-6 mt-2"
        >{{ externalErrors.description && externalErrors.description[0] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, ref } from 'vue';
import { fetchSelectedMenuCategories, fetchSelectedMenuModifiers } from '@/api';
import _ from 'lodash';

const store = useStore()
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);

const props = defineProps({
  formFields: Object,
  externalErrors: Object,
  productImagePath: String
});
const emit = defineEmits(['update:form-fields']);
const productCategories = reactive([]);
const productModifiers = reactive([]);

onMounted(() => {
  store.commit('setLoadingStatus', true)
  fetchSelectedMenuCategories(activeMenuID.value)
    .then((res) => Object.assign(productCategories, res.results))
  fetchSelectedMenuModifiers(activeMenuID.value)
    .then((res) => Object.assign(productModifiers, res.results))
  store.commit('setLoadingStatus', false)
});

function addNewProductSize() {
  props.formFields.sizes.push({ ...props.formFields.sizes[0] })
}

function removeProductSize() {
  props.formFields.sizes.pop()
}
</script>
