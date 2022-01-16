<template>
  <div class="bg-theme-1 min-h-screen py-10">
    <div class="intro-y box mx-10">
      <div
        class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-xl mr-auto">Create Company</h2>
      </div>
      <div class="p-5">
        <CompanyForm />
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import CompanyForm from '../../components/forms/CompanyForm.vue'

export default defineComponent({
  components: { CompanyForm }
})
</script>
