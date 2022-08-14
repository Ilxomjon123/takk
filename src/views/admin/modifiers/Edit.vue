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
            <h2 class="font-medium text-base mr-auto">Edit Category</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-6">
              <CategoryForm
                :form="getCategory"
                dispatcher="putCategory"
                :isEdit="true"
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
import { mapGetters } from 'vuex';
import CategoryForm from '@/components/forms/CategoryForm.vue';

export default defineComponent({
  components: { CategoryForm },
  computed: {
    ...mapGetters(['getLoadingStatus', 'getCategory'])
  },
  data() {
    return {
      id: null
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.$store.commit('setLoadingStatus', true);
    await this.$store.dispatch('fetchCategory', this.id);
    this.$store.commit('setLoadingStatus', false);
  }
});
</script>
