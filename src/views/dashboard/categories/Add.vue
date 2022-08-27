<script setup>
import CategoryForm from '@/components/forms/CategoryForm.vue';
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
            <h2 class="font-medium text-base mr-auto">Add New Category</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-6">
              <CategoryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
