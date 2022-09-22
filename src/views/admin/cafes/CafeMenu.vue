<script setup>
import { computed, reactive, ref } from 'vue';
import defaultLogo from '@/assets/images/default_employee.png';
import cash from 'cash-dom';

const props = defineProps({
  formType: {
    type: String,
    default: 'add',
  },
  formData: {
    type: Object,
    default: () => {},
  },
  externalErrors: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(['update:selectedItem', 'remove:formData']);
const cafeMenuItems = reactive([
  {
    title: 'Information',
    component: 'CafeInformation',
    icon: 'ActivityIcon',
  },
  {
    title: 'Working days',
    component: 'CafeWorkingDays',
    icon: 'CalendarIcon',
  },
  {
    title: 'Operations',
    component: 'CafeOperations',
    icon: 'BoxIcon',
  },
  {
    title: 'Delivery',
    component: 'CafeDelivery',
    icon: 'TruckIcon',
  },
  {
    title: 'Gallery',
    component: 'CafeGallery',
    icon: 'ImageIcon',
  },
]);

const selectedItem = ref('CafeInformation');
const statusList = ref([
  { label: 'BLOCKED', value: 0 },
  { label: 'ACTIVE', value: 1 },
  { label: 'PENDING', value: 2 },
]);
const cafeCurrentStatus = computed(() =>
  statusList.value.find((status) => status.value == props.formData?.status)
);

function selectItem(item) {
  selectedItem.value = item;
  emit('update:selectedItem', item);
}

function openStatusFormModal() {
  cash('#cafe-status-modal').modal('show');
}
</script>

<template>
  <!-- BEGIN: Cafe Menu -->
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <div class="intro-y box mt-5">
      <div class="relative flex items-center p-5">
        <div class="w-24 h-24 image-fit">
          <img
            alt="cafe_logo"
            class="rounded-full"
            :src="
              formData.photos?.length > 0
                ? formData.photos[0].image_small
                : defaultLogo
            "
          />
        </div>
        <div class="ml-4 mr-auto">
          <div class="font-medium text-base">
            {{ formData.name }}
          </div>
          <div class="text-gray-600">{{ formData.address }}</div>
          <div v-if="cafeCurrentStatus">
            <span>Status: </span>
            <span
              :class="{
                'text-theme-6': cafeCurrentStatus?.value == 0,
                'text-theme-9': cafeCurrentStatus?.value == 1,
                'text-gray-600': cafeCurrentStatus?.value == 2,
              }"
            >
              {{ cafeCurrentStatus?.label }}
            </span>
          </div>
        </div>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5">
        <button
          v-for="item in cafeMenuItems"
          @click="selectItem(item.component)"
          class="flex items-center mt-5"
          :class="{
            'text-theme-1 dark:text-theme-10 font-medium':
              selectedItem === item.component,
          }"
          :disabled="
            item.component !== 'CafeInformation' && formType !== 'edit'
          "
          title="Fill cafe information"
        >
          <component :is="item.icon" class="w-4 h-4 mr-2" />
          {{ item.title }}
        </button>
      </div>
      <div class="p-5 border-t border-gray-200 dark:border-dark-5 flex">
        <button
          type="button"
          class="btn btn-warning py-1 px-2"
          @click="openStatusFormModal"
          :disabled="!formData.id"
        >
          Change status
        </button>
        <button
          type="button"
          class="btn btn-danger py-1 px-2 ml-auto"
          :disabled="formType === 'add'"
          @click="emit('remove:formData')"
        >
          Remove current cafe
        </button>
      </div>
    </div>
  </div>
  <!-- END: Cafe Menu -->
</template>

<style lang="scss" scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
