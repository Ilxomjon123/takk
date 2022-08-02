<script setup>
import store from '@/store';
import { onMounted, ref } from 'vue';
import InputField from './InputField.vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => { }
  },
  externalErrors: {
    type: Object,
    default: () => { }
  }
});

const emit = defineEmits(['update:formData']);
const menuList = ref([])

async function submit() {
  emit('update:formData', props.formData);
}

onMounted(async () => {
  const res = await store.dispatch('fetchMenus')
  menuList.value = res.results
})
</script>

<template>
  <div class="intro-y box lg:mt-5">
    <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
      <h2 class="font-medium text-base mr-auto">Cafe Operations</h2>
    </div>
    <div class="p-5">
      <div class="flex xl:flex-row flex-col">
        <div class="flex-1 mt-6 xl:mt-0">
          <div class="grid grid-cols-12 gap-x-5">
            <div class="col-span-12 2xl:col-span-6">
              <InputField v-model="formData.tax_rate" title="Tax rate" id-value="cafe-form-tax_rate"
                :error="externalErrors.tax_rate && externalErrors.tax_rate[0]" :is-required="true" typeValue="number" />
              <InputField v-model="formData.order_limit" title="Order limit" id-value="cafe-form-order_limit"
                :error="externalErrors.order_limit && externalErrors.order_limit[0]" :is-required="true"
                typeValue="number" class="mt-3" />
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <InputField v-model="formData.order_time_limit"
                title="Order Interval Time (interval between each order times)" id-value="cafe-form-order_time_limit"
                :error="externalErrors.order_time_limit && externalErrors.order_time_limit[0]" :is-required="true"
                typeValue="number" class="mt-3 2xl:mt-0" />
              <div class="mt-3">
                <label for="cafe-form-menu" class="form-label">Menu</label>
                <TomSelect id="cafe-form-menu" v-model="formData.menu" :options="{
                  placeholder: 'Search..'
                }" class="w-full">
                  <option v-for="({ name, id }) in menuList" :key="id" :value="id">{{ name }}</option>
                </TomSelect>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary mt-3" @click="submit">
            <!-- <LoadingIcon v-if="isLoading" icon="tail-spin" class="w-4 h-4 mr-3" color="#fff" /> -->
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
