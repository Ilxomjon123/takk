<script setup>
import { computed, ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

const props = defineProps({
  inputOptions: {
    type: Object,
    default: () => { }
  }
});

const emits = defineEmits(['update.modelValue'])

const phone = ref('');
// const formattedVal = computed({
//   get: () => phone.value,
//   set: (val) => {
//     const correctVal = val.replace(/\s+/g, '')
//     console.log({ correctVal });
//     phone.value = correctVal
//   }
// })

</script>

<template>
  <vue-tel-input v-model="phone" mode="international" :autoFormat="true" :inputOptions="{
    styleClasses: 'form-control border-gray-300',
    id: 'phone',
    showDialCode: true,
    autoDefaultCountry: false,
    defaultCountry: '+1',
    ...inputOptions
  }" />
</template>

<style lang="scss">
.vti__input {
  // padding: .58rem 0 .5rem 1rem !important;
  height: 38px;
}

.vti__input,
.vti__dropdown {
  border-radius: .375rem;
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
