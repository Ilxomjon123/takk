<script setup>
import TelInput from '@/components/forms/TelInput.vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';

const route = useRoute(),
  form = reactive({}),
  isDisabled = ref(true),
  submitText = ref('Send Code'),
  isRegister = ref(false),
  errorText = ref(''),
  dialCode = ref(''),
  isLoading = ref(false),
  headText = ref('Enter phone number'),
  telInputOptions = reactive({
    autofocus: true,
    required: true,
    maxlength: 20,
  });

async function submit() {
  try {
    isLoading.value = true;
    errorText.value = '';

    const oldButtonText = submitText.value;
    submitText.value = '';
    form.referral_code = route.query?.referral_code;
    const res = await store.dispatch('signin', form);

    if (!res.token) {
      console.log('ok1');
      // Telefon Raqam kiritilgandan so'ng
      isRegister.value = res.is_register;
      isDisabled.value = false;
      submitText.value = isRegister.value ? 'Sign Up' : 'Sign In';
      headText.value = isRegister.value
        ? 'Fill the form below'
        : 'Enter SMS code';
    } else {
      // Login muvaffaqiyatli bo'lsa
      submitText.value = oldButtonText;

      store.commit('setToken', res.token);
      store.commit('setUser', res.user);

      if (res.user?.is_superuser) {
        location.href = '/admin';
      } else {
        let path;

        switch (res.user?.state_steps) {
          case store.state.user.STEP_CAFE:
            path = '/entry/cafe';
            break;
          case store.state.user.STEP_FINISH:
            path = '/entry/finish';
            break;
          case store.state.user.STEP_DASHBOARD:
            path = '/dashboard';
            break;
          default:
            path = '/entry/company';
        }

        location.href = path;
      }
    }
  } catch (error) {
    // API dan xato qaytsa
    submitText.value = 'Send code';
    errorText.value = error.response?.data?.detail;

    // if (typeof error.response?.data?.detail !== 'undefined') {
    //   errorText.value = error.response?.data?.detail;
    // } else {
    //   errorText.value = error.response?.data?.data?.detail;
    // }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
    {{ headText }}
  </h2>
  <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
    A few more clicks to sign in to your account. Manage all your e-commerce
    accounts in one place
  </div>
  <form @submit.prevent="submit">
    <div class="intro-x mt-8">
      <TelInput
        v-model:phone-number="form.phone"
        v-model:dial-code="form.phone_code"
        :inputOptions="telInputOptions"
      />
      <input
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="SMS Code"
        v-model="form.sms_code"
        v-if="!isDisabled"
      />
      <!-- <input
        v-if="isRegister"
        type="text"
        class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
        placeholder="Username"
        v-model="form.username"
      /> -->
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
        <LoadingIcon
          v-if="isLoading"
          icon="three-dots"
          color="white"
          class="ml-2 py-1.5"
        />
        <span v-else>{{ submitText }}</span>
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
