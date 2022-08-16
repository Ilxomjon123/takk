<script setup>
import { computed, ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
const props = defineProps({
  inputOptions: {
    type: Object,
    default: () => {}
  }
});

const emits = defineEmits(['update.modelValue']);

const countryDialCode = ref('');
const phone = ref('');

function onCountryChange(countryObj) {
  // console.log({ countryObj });
  countryDialCode.value = countryObj.dialCode;
}
</script>

<template>
  <vue-tel-input
    v-model="phone"
    mode="international"
    :autoFormat="true"
    :defaultCountry="'US'"
    :inputOptions="{
      styleClasses: 'form-control border-gray-300',
      id: 'phone',
      showDialCode: true,
      ...inputOptions
    }"
    :dropdownOptions="{
      showDialCodeInList: true,
      showDialCodeInSelection: false,
      showFlags: true,
      showSearchBox: true
    }"
    @country-changed="onCountryChange"
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
