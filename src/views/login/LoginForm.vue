<template>
  <h2
    class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
  >{{ headText }}</h2>
  <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
    A few more clicks to sign in to your account. Manage all your
    e-commerce accounts in one place
  </div>
  <form @submit.prevent="submit">
    <div class="intro-x mt-8">
      <input
        autofocus
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block"
        placeholder="Phone"
        v-model="form.phone"
        :disabled="!isDisabled"
        required
      />
      <input
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="SMS Code"
        v-model="form.sms_code"
        v-if="!isDisabled"
      />
      <input
        v-if="isRegister"
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="Username"
        v-model="form.username"
      />
      <input
        v-if="isRegister"
        type="email"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="Email"
        v-model="form.email"
      />
      <p class="text-theme-6" v-text="errorText" />
    </div>
    <div
      class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
    ></div>
    <div class="intro-x mt-5 xl:mt-8 text-center xl:text-center">
      <button
        class="btn btn-primary py-3 px-5 w-full xl:w-32 xl:mr-3 align-top"
      >
        {{ submitText }}
        <LoadingIcon
          v-if="isLoading"
          icon="three-dots"
          color="white"
          class="w-8 h-8 ml-2"
        />
      </button>
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
import { mapMutations } from "vuex";
import signin from "../../services/auth";

export default defineComponent({
  data() {
    return {
      form: {},
      isDisabled: true,
      submitText: "Send Code",
      isRegister: false,
      errorText: "",
      isLoading: false,
      headText: "Enter phone number"
    }
  },
  methods: {
    ...mapMutations(['setUser', 'setToken']),
    async submit() {
      this.errorText = "";
      const oldButtonText = this.submitText;
      this.submitText = "";
      this.isLoading = true;
      const res = await signin(this.form);
      if (res.status) {
        if (!res.data.token) {
          // Telefon Raqam kiritilgandan so'ng
          this.isRegister = res.data.is_register;
          this.isDisabled = false;
          this.submitText = this.isRegister ? 'Sign Up' : 'Sign In';
          this.headText = this.isRegister ? 'Fill the form above' : 'Enter SMS code';
        } else {
          // Login muvaffaqiyatli bo'lsa
          this.submitText = oldButtonText;
          this.setToken(res.data.token);
          this.setUser(res.data.user);
          window.location.replace("/dashboard");
          // this.$router.push('/dashboard');
        }
      }
      // API dan xato qaytsa
      else {
        this.submitText = oldButtonText;
        this.errorText = res.data.data.detail;
      }
      this.isLoading = false;
    }
  },
});
</script>