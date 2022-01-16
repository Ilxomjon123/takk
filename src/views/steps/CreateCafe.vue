<template>
  <div class="min-h-screen py-10">
    <div class="intro-y box mx-10">
      <div
        class="flex flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-xl mr-auto">Create Cafe</h2>
        <div class="form-check sm:mt-0">
          <button class="btn btn-success">Skip -></button>
        </div>
      </div>
      <div class="p-5">
        <CafeForm />
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import CafeForm from '../../components/forms/CafeForm.vue'

export default defineComponent({
  components: { CafeForm }
  , methods: {
    skip() {
      this.$router.push('/create-menu')
    }
  }
})
</script>


<style scoped>
@media (max-width: 639px) {
  html body {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>