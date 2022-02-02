<template>
  <CafeForm />
  <ErrorNotification res="errorNotification" />
</template>


<script>
import { defineComponent } from 'vue'
import CafeForm from '../../components/forms/CafeForm.vue'
import ErrorNotification from '../../components/notifications/ErrorNotification.vue';
import { mapActions } from 'vuex';

export default defineComponent({
  components: { CafeForm, ErrorNotification }
  , methods: {
    ...mapActions(['putStep']),
    async skip() {
      const res = await this.putStep(this.$store.state.user.STEP_DASHBOARD);
      // const res = await this.putStep(this.$store.state.user.STEP_MENU);
      if (res.status) {
        this.$router.push('/dashboard')
        // this.$router.push('/entry/menu')
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
