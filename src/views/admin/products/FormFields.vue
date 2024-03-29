<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import _ from 'lodash';

import SimpleImageUpload from '@/components/forms/file-upload/SimpleImageUpload.vue';
import {
  fetchSelectedMenuCategories,
  fetchSelectedMenuModifiers,
} from '@/api/admin';
import store from '@/store';

const activeMenuID = computed(() => store.getters['getSelectedMenuId']);

const props = defineProps({
  formFields: {
    type: Object,
    default: {
      sizes: [],
    },
  },
  externalErrors: Object,
  productImagePath: String,
});
const emit = defineEmits(['update:form-fields']);
const productCategories = reactive([]);
const productModifiers = reactive([]);

onMounted(() => {
  fetchSelectedMenuCategories(activeMenuID.value).then((res) =>
    Object.assign(productCategories, res.results)
  );
  fetchSelectedMenuModifiers(activeMenuID.value).then((res) =>
    Object.assign(productModifiers, res.results)
  );
});

function addNewProductSize() {
  props.formFields.sizes.push({ ...props.formFields.sizes[0] });
}

function removeProductSize(index) {
  props.formFields.sizes.splice(index, 1);
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="lg:basis-1/3">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Product image</h2>
      </div>
      <SimpleImageUpload
        class="w-52"
        :image-path="productImagePath"
        @update-image-file="formFields.image = $event"
      />
      <span class="text-theme-6 mt-2">{{
        externalErrors.image && externalErrors.image[0]
      }}</span>
      <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Product size info</h2>
      </div>
      <template v-for="(item, index) in formFields.sizes">
        <div class="shadow border rounded-md p-5 mb-5">
          <div class="flex flex-col lg:flex-row gap-5 pb-5">
            <div class="input-form">
              <label class="form-label" :for="'product_size_name' + index">
                Product variance name
                <span class="text-theme-6">*</span>
                <Tippy content="For example:  Large, Medium, Small">
                  <InfoIcon class="block w-4" />
                </Tippy>
              </label>
              <input
                :id="'product_size_name' + index"
                v-model="item.name"
                class="form-control"
                type="text"
              />
              <span class="text-theme-6 mt-2">{{
                externalErrors.sizes && externalErrors.sizes[0]
              }}</span>
            </div>
            <div class="input-form">
              <label class="form-label" :for="'product_size_price' + index">
                Product variance price
                <span class="text-theme-6">*</span>
                <Tippy class="invisible" content="Fill price">
                  <InfoIcon class="block w-4" />
                </Tippy>
              </label>
              <input
                :id="'product_size_price' + index"
                v-model="item.price"
                class="form-control"
                type="number"
                step="0.01"
              />
              <span class="text-theme-6 mt-2">{{
                externalErrors.sizes && externalErrors.sizes[0]
              }}</span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="form-check">
              <input
                :id="'product_size_is_default' + index"
                class="form-check-switch"
                type="checkbox"
                v-model="item.default"
              />
              <label
                class="form-check-label"
                :for="'product_size_is_default' + index"
                >Default</label
              >
            </div>
            <button
              type="button"
              class="disabled:cursor-not-allowed disabled:text-theme-32 text-theme-6"
              :disabled="formFields.sizes.length === 1"
              @click="removeProductSize(index)"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </template>
      <div class="flex pb-5 w-full justify-between">
        <button
          type="button"
          class="btn btn-primary"
          @click="addNewProductSize"
        >
          Add variance
        </button>
      </div>
    </div>
    <div class="lg:basis-2/3">
      <div
        class="flex flex-col sm:flex-row items-center mb-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Product info</h2>
      </div>
      <div class="flex flex-col lg:flex-row gap-5">
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
          <span class="text-theme-6 mt-2">{{
            externalErrors.name && externalErrors.name[0]
          }}</span>
        </div>
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_quickest_time">
            Preparation time (in minutes)
            <span class="text-theme-6">*</span>
          </label>
          <div class="input-group">
            <input
              id="product_quickest_time"
              class="form-control"
              v-model="formFields.quickest_time"
              aria-describedby="input-group-quickesttime"
            />
            <!-- <div id="input-group-quickesttime" class="input-group-text">mins</div> -->
          </div>
          <span name="call_center" class="text-theme-6 mt-2">{{
            externalErrors.quickest_time && externalErrors.quickest_time[0]
          }}</span>
        </div>
      </div>
      <!-- <div
        class="flex flex-col sm:flex-row items-center my-5 border-b border-gray-200 dark:border-dark-5"
      > -->
      <label class="form-label pt-3">
        Product Availability Time
        <span class="text-theme-6">*</span>
        <Tippy content="If left blank product is always available.">
          <InfoIcon class="block w-4 mb-1" />
        </Tippy>
      </label>
      <!-- </div> -->
      <div class="flex flex-col lg:flex-row gap-5">
        <div class="input-form lg:basis-1/2">
          <!-- <label for="product_start_time" class="form-label">
            Product start time
            <span class="text-theme-6">*</span>
          </label> -->
          <input
            id="product_start_time"
            type="time"
            class="form-control timepicker"
            v-model="formFields.start"
          />
          <span class="text-theme-6 mt-2">{{
            externalErrors.start && externalErrors.start[0]
          }}</span>
        </div>
        <div class="input-form lg:basis-1/2">
          <!-- <label for="product_end_time" class="form-label">
            Product end time
            <span class="text-theme-6">*</span>
          </label> -->
          <input
            id="product_end_time"
            type="time"
            class="form-control timepicker"
            v-model="formFields.end"
          />
          <span class="text-theme-6 mt-2">{{
            externalErrors.end && externalErrors.end[0]
          }}</span>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_tax_percent">
            Tax applicability
            <Tippy
              content="Is the product liable for full, partial tax or tax exempt."
            >
              <InfoIcon class="text-xs w-4" />
            </Tippy>
          </label>
          <TomSelect
            id="product_tax_percent"
            class=""
            v-model="formFields.tax_percent"
          >
            <option value="100">Full tax rate</option>
            <option value="50">Half the tax rate</option>
            <option value="0">No tax</option>
          </TomSelect>
          <span class="text-theme-6 mt-2">{{
            externalErrors.tax_percent && externalErrors.tax_percent[0]
          }}</span>
        </div>
        <div class="input-form lg:basis-1/2">
          <label class="form-label" for="product_categories">
            Product category
            <span class="text-theme-6">*</span>
            <InfoIcon class="invisible" />
          </label>
          <TomSelect
            id="product_categories"
            class=""
            v-model="formFields.category"
          >
            <option v-for="item in productCategories" :value="item.id">
              {{ item.name }}
            </option>
          </TomSelect>
          <span class="text-theme-6 mt-2">{{
            externalErrors.category && externalErrors.category[0]
          }}</span>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-5 pt-3">
        <div class="input-form w-full">
          <label class="form-label" for="product_modifiers"
            >Product modifiers</label
          >
          <TomSelect
            id="product_modifiers"
            v-model="formFields.modifiers"
            :options="{
              placeholder: 'Select product modifiers',
            }"
            multiple
          >
            <option v-for="item in productModifiers" :value="item.id">
              {{ item.name }}
            </option>
          </TomSelect>
          <span class="text-theme-6 mt-2">{{
            externalErrors.modifiers && externalErrors.modifiers[0]
          }}</span>
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
        <span class="text-theme-6 mt-2">{{
          externalErrors.description && externalErrors.description[0]
        }}</span>
      </div>
    </div>
  </div>
</template>
