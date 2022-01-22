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
            <h2 class="font-medium text-base mr-auto">Company</h2>
            <h2
              class="font-medium text-base ml-auto"
              :class="getCompany.status ? 'text-theme-9' : 'text-theme-6'"
            >{{ getCompany.status ? 'Active' : 'Not Active' }}</h2>
          </div>
          <div class="p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col"></div>
            <CompanyEditForm :company="getCompany" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import CompanyEditForm from '../../../components/forms/CompanyEditForm.vue';

export default defineComponent({
  async mounted() {
    await this.fetchCompany();
  },
  computed: {
    ...mapGetters(["getCompany"])
  },
  methods: {
    ...mapActions(["fetchCompany"])
  },
  components: { CompanyEditForm }
})
</script>
