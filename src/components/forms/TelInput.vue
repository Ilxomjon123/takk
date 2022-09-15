<script setup>
import { ref, watch, watchEffect } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

const props = defineProps({
  inputOptions: {
    type: Object,
    default: () => {},
  },
  dialCode: '',
  phoneNumber: '',
});

const emits = defineEmits(['update:phoneNumber', 'update:dialCode']);
const phone = ref('');
const defaultCountryCode = ref('US');

watch(
  () => props.phoneNumber,
  (newVal) => {
    if (newVal) {
      console.log('ok1');
      if (newVal.startsWith(props.dialCode)) {
        console.log('ok2');
        phone.value = newVal.substring(props.dialCode.length);
      } else if (newVal.startsWith('+' + props.dialCode)) {
        console.log('ok3');
        phone.value = newVal.substring(props.dialCode.length + 1);
      } else phone.value = newVal;
    }
  },
  { immediate: true }
);

watchEffect(() => {
  if (Number(props.dialCode)) {
    if (Number(props.dialCode) == 1) {
      defaultCountryCode.value = 'US';
    } else defaultCountryCode.value = Number(props.dialCode);
  }

  // if (props.phoneNumber) {
  //   console.log('ok1');
  //   if (props.phoneNumber.startsWith(props.dialCode)) {
  //     console.log('ok2');
  //     phone.value = props.phoneNumber.substring(props.dialCode.length);
  //   } else if (props.phoneNumber.startsWith('+' + props.dialCode)) {
  //     console.log('ok3');
  //     phone.value = props.phoneNumber?.substring(props.dialCode.length + 1);
  //   } else phone.value = props.phoneNumber;
  // }
});

function onCountryChange(countryObj) {
  // defaultCountryCode.value = '+' + countryObj.dialCode;
  emits('update:dialCode', countryObj.dialCode);

  if (countryObj.dialCode == 'US') {
    emits('update:phoneNumber', '+1' + phone.value);
  } else {
    emits('update:phoneNumber', '+' + countryObj.dialCode + phone.value);
  }
}

function onPhoneChange(event) {
  const phoneValue = event.target?.value.replace(/\s+/g, '');

  if (defaultCountryCode.value == 'US') {
    emits('update:phoneNumber', '+1' + phoneValue);
  } else {
    emits('update:phoneNumber', '+' + defaultCountryCode.value + phoneValue);
  }
}
</script>

<template>
  <vue-tel-input
    v-model="phone"
    @change="onPhoneChange"
    @country-changed="onCountryChange"
    mode="international"
    :autoFormat="false"
    :defaultCountry="defaultCountryCode"
    :key="defaultCountryCode"
    :autoDefaultCountry="false"
    :inputOptions="{
      styleClasses: 'form-control border-gray-300',
      id: 'phone',
      showDialCode: false,
      ...inputOptions,
    }"
    :dropdownOptions="{
      showDialCodeInList: true,
      showDialCodeInSelection: true,
      showFlags: true,
      showSearchBox: false,
    }"
  />
</template>

<style lang="scss">
.vti__input {
  // padding: .58rem 0 .5rem 1rem !important;
  height: 38px;
}

.vti__input,
.vti__dropdown {
  border-radius: 0.375rem;
}

.vti__dropdown-list {
  z-index: 2;
}

.vti__dropdown-list,
.vti__dropdown:hover,
.vti__dropdown.disabled,
.vti__dropdown.open {
  background-color: #fff !important;
}

.dark {
  .vti__dropdown-list .highlighted {
    color: gray;
  }

  .vti__dropdown-list,
  .vti__dropdown,
  .vti__dropdown.disabled,
  .vti__dropdown.open {
    background-color: rgb(41, 49, 69) !important;
  }
}
</style>
