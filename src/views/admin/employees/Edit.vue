<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->

      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-12 2xl:col-span-12">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5" v-if="!getLoadingStatus">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Edit Employee</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-6">
              <AdminEmployeeForm
                :isEdit="true"
                dispatcher="putEmployee"
                :form="getAdminEmployee"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AdminEmployeeForm from '@/components/forms/AdminEmployeeForm.vue';

export default defineComponent({
  components: { AdminEmployeeForm },
  async created() {
    this.$store.commit('setLoadingStatus', true);

    await this.fetchAdminEmployee(this.$route.params.id);
    this.$store.commit('setLoadingStatus', false);
  },
  computed: {
    ...mapGetters(['getLoadingStatus', 'getAdminEmployee'])
  },
  methods: {
    ...mapActions(['fetchAdminEmployee'])
  }
});
</script>
