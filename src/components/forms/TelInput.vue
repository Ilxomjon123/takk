<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
const props = defineProps({
  inputOptions: {
    type: Object,
    default: () => {}
  },
  dialCode: {
    type: Number || String,
    default: 'US'
  },
  phoneNumber: ''
});

const emits = defineEmits(['update:phoneNumber', 'update:dialCode']);
const defaultCountryCode = ref('US');

watchEffect(() => {
  defaultCountryCode.value = Number(props.dialCode);
});

function onCountryChange(countryObj) {
  emits('update:dialCode', countryObj.dialCode);
}

function onPhoneChange(number, phoneObj) {
  emits(
    'update:phoneNumber',
    phoneObj.number?.substring(phoneObj.countryCallingCode.length + 1)
  );
}
</script>

<template>
  <vue-tel-input
    v-model="phoneNumber"
    @on-input="onPhoneChange"
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
      ...inputOptions
    }"
    :dropdownOptions="{
      showDialCodeInList: true,
      showDialCodeInSelection: true,
      showFlags: true,
      showSearchBox: false
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
