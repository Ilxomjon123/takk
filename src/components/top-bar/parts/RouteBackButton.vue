<template>
  <div class="breadcrumb mr-auto hidden sm:flex">
    <button class="btn btn-primary" @click="back">
      <ChevronLeftIcon />
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
})
</script>
