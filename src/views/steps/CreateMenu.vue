<template>
  <div class="intro-y box mx-10">
    <div
      class="flex flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-xl mr-auto">Create Menu</h2>
      <div class="form-check sm:mt-0">
        <button class="btn btn-success" @click="skip">Skip -></button>
      </div>
    </div>
    <div class="p-5">
      <MenuForm />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import MenuForm from '@/components/forms/MenuForm.vue';
import { useNotyf } from '@/composables/useNotyf';

const notyf = useNotyf();

export default defineComponent({
  components: { MenuForm },
  methods: {
    ...mapActions(['putStep']),
    async skip() {
      try {
        const res = await this.putStep(this.$store.state.user.STEP_DASHBOARD);
        this.$router.push('/dashboard');
      } catch (error) {
        notyf.error('Error while updating step: ' + error.messages);
      }
    },
  },
});
</script>

<style scoped>
@media (max-width: 639px) {
  html body {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
