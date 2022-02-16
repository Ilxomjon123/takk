<template>
  <div class="text-center">
    <!-- BEGIN: Notification Content -->
    <div id="success-notification-content" class="toastify-content hidden flex">
      <CheckCircleIcon class="text-theme-9" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Successfully!</div>
        <!-- <div class="text-gray-600 mt-1">{{ message }}</div> -->
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
        node: cash('#success-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: duration,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    }
  },
  computed: {
    status() {
      return this.$store.state.common.successNotificationStatus;
    }
  },
  watch: {
    status(to, from) {
      if (to) {
        this.show();
        this.$store.state.common.successNotificationStatus = false;
      }
    }
  }
})
</script>
