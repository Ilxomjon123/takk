<template>
  <form @submit.prevent="submit">
    <div class="intro-x mt-8">
      <input
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block"
        placeholder="Phone"
        v-model="form.phone"
        :disabled="!isDisabled"
      />
      <input
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="SMS Code"
        v-model="form.sms_code"
        :disabled="isDisabled"
      />
      <input
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="Username"
        v-model="form.username"
        :disabled="isDisabled"
      />
      <input
        type="email"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="Email"
        v-model="form.email"
        :disabled="isDisabled"
      />
    </div>
    <div
      class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
    ></div>
    <div class="intro-x mt-5 xl:mt-8 text-center xl:text-center">
      <button
        class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
        v-text="submitText"
      />
    </div>
  </form>
  <div
    class="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left"
  >
    By signin up, you agree to our
    <br />
    <a class="text-theme-1 dark:text-theme-10" href>Terms and Conditions</a>
    &
    <a class="text-theme-1 dark:text-theme-10" href>Privacy Policy</a>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import signin from "../../services/auth";

export default defineComponent({
  data() {
    return {
      form: {},
      isDisabled: true,
      submitText: "Send Code"
    }
  },
  methods: {
    submit() {
      // console.log(import.meta.env.VITE_API_URL);
      signin(this.form)
    }
  },
});
</script>