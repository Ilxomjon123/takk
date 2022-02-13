<template>
  <div id="contact-us-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog border-4 rounded-lg border-theme-31">
      <div class="modal-content">
        <a data-dismiss="modal" href="javascript:;">
          <XIcon class="w-7 h-7 text-gray-500" />
        </a>
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <div class="text-2xl mt-5">Keep in touch</div>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="px-10 pb-8 text-center text-base">
              <div class="mb-5">
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div class="mb-5">
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div class="mb-5">
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <div class="mb-5">
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter cafe name"
                />
              </div>
              <div class="mb-5">
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="Enter cafe address"
                />
              </div>
              <div class="mb-5">
                <textarea
                  class="form-control"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <div class="mb-5">
                <VueRecaptcha
                  :sitekey="siteKey"
                  :load-recaptcha-script="true"
                  @verify="handleSuccess"
                  @error="handleError"
                />
              </div>

              <button type="button" class="btn-primary">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { VueRecaptcha } from 'vue-recaptcha'

// const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

const siteKey = computed(() => {
  return 'yourSiteAPIKey';
});

const handleError = () => {
  // Do some validation
};

const handleSuccess = (response) => {
  // Do some validation
};

// Hide modal
const hideModal = () => {
  cash("#programmatically-modal").modal("hide");
};
</script>

<style lang="scss" scoped>
.btn-primary {
  @apply bg-theme-31 text-white shadow-lg py-2 px-6 rounded-xl font-bold hover:bg-theme-2 hover:text-black text-base lg:text-lg;
}
</style>

