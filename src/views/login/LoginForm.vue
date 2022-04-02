<template>
  <h2
    class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
  >{{ headText }}</h2>
  <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
    A few more clicks to sign in to your account. Manage all your e-commerce
    accounts in one place
  </div>
  <form @submit.prevent="submit">
    <div class="intro-x mt-8">
      <!-- <vue-tel-input
        styleClasses="intro-x login__input form-control px-4 border-gray-300"
        :inputOptions="{
          autofocus: true,
          required: true,
          maxlength: 20,
          showDialCode: true,
          placeholder: 'Phone'
        }"
        autoformat
        mode="international"
        v-model="form.phone"
      ></vue-tel-input>-->
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
      <div class="text-theme-6 mt-2" v-text="errorText" />
    </div>
    <div
      class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
    ></div>
    <div class="intro-x mt-5 xl:mt-8 text-center xl:text-center">
      <button
        class="btn btn-primary py-3 px-5 w-full xl:w-32 xl:mr-3 align-top"
        :disabled="isLoading"
      >
        {{ submitText }}
        <LoadingIcon
          v-if="isLoading"
          icon="three-dots"
          color="white"
          class="ml-2"
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
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { setToken } from '@/api';

export default defineComponent({
  data() {
    return {
      form: {},
      isDisabled: true,
      submitText: 'Send Code',
      isRegister: false,
      errorText: '',
      isLoading: false,
      headText: 'Enter phone number'
    };
  },
  methods: {
    ...mapMutations(['setRequiredDetails']),
    ...mapActions(['signin']),
    async submit() {
      this.errorText = '';
      const oldButtonText = this.submitText;
      this.submitText = '';
      this.isLoading = true;
      const res = await this.$store.dispatch('signin', this.form);
      // this.signin(this.form);
      // console.log(res);
      if (res.status) {
        if (!res.data.token) {
          // Telefon Raqam kiritilgandan so'ng
          this.isRegister = res.data.is_register;
          this.isDisabled = false;
          this.submitText = this.isRegister ? 'Sign Up' : 'Sign In';
          this.headText = this.isRegister
            ? 'Fill the form below'
            : 'Enter SMS code';
        } else {
          // Login muvaffaqiyatli bo'lsa
          this.submitText = oldButtonText;
          this.setRequiredDetails({
            user: res.data.user,
            token: res.data.token
          });
          setToken(res.data.token.access);
          // this.$router.push('/entry');
          window.location.replace('/entry');
        }
      }
      // API dan xato qaytsa
      else {
        this.submitText = oldButtonText;
        this.errorText = res.data.data.detail;
      }
      this.isLoading = false;
    }
  }
});
</script>
