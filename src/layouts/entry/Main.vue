<template>
  <DarkModeSwitcher />
  <div class="py-10">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters(['getStep'])
  },
  mounted() {
    const step = this.getStep;
    console.log(step);
    let path;
    switch (step) {
      case this.$store.state.user.STEP_COMPANY: path = '/entry/company'; break;
      case this.$store.state.user.STEP_CAFE: path = '/entry/cafe'; break;
      // case this.$store.state.user.STEP_MENU: path = '/entry/menu'; break;
      case this.$store.state.user.STEP_DASHBOARD: path = '/dashboard'; break;
      default: path = '/entry';
    }
    this.$router.push(path);
  }
})
</script>
