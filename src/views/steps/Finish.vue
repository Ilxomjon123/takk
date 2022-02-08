<template>
  <div class="intro-y box mx-10">
    <div
      class="flex flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
    >
      <h2 class="font-medium text-xl mr-auto text-center">Finished registration</h2>
      <div class="form-check sm:mt-0">
        <button class="btn btn-success" @click="skip">Skip -></button>
      </div>
    </div>
    <div
      class="p-5"
    >Congratulations! You have registered your company. Now please go to your Dashboard to finalize your menu by adding new categories and products. You can also add more locations, if you have more than one cafe.</div>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  methods: {
    ...mapActions(['putStep']),
    async skip() {
      const res = await this.putStep(this.$store.state.user.STEP_DASHBOARD);
      if (res.status) {
        this.$router.go('/dashboard')
      } else {
        this.$refs.errorNotification.show()
      }
    }
  }
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