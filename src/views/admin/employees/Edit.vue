<script setup>
import AdminEmployeeForm from '@/components/forms/AdminEmployeeForm.vue';
import { useRoute } from 'vue-router';
import store from '@/store';

const route = useRoute();
const employee = await store.dispatch(
  'adminEmployee/fetchAdminEmployee',
  route.params?.id
);
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->

      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-12 2xl:col-span-12">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Edit Employee</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-6">
              <AdminEmployeeForm
                :isEdit="true"
                :form="employee"
                dispatcher="adminEmployee/putAdminEmployee"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
