<template>
  <div class="text-center">
    <!-- BEGIN: Notification Content -->
    <div id="error-notification-content" class="toastify-content hidden flex">
      <XCircleIcon class="text-theme-6" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Something went wrong!</div>
        <div class="text-gray-600 mt-1">{{ message }}</div>
      </div>
    </div>
    <!-- END: Notification Content -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Toastify from 'toastify-js'
import cash from 'cash-dom'

export default defineComponent({
  props: {
    message: {
      type: String,
      default: null
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  methods: {
    show() {
      const duration = this.duration;
      Toastify({
        node: cash('#error-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: duration,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    },
  },
  computed: {
    status() {
      return this.$store.state.common.errorNotificationStatus;
    }
  },
  watch: {
    status(to, from) {
      if (to) {
        this.show();
      }
    }
  }
})
</script>
