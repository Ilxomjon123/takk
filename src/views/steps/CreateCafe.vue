<template>
  <CafeForm />
</template>


<script>
import { defineComponent } from 'vue'
import CafeForm from '../../components/forms/CafeForm.vue'

export default defineComponent({
  components: { CafeForm }
  , methods: {
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
