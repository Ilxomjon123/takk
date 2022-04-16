<script setup>
import TomSelect from 'tom-select';
import { onMounted, ref } from 'vue';

const props = defineProps({
  items: Array,
  modelValue: Number
});

const emit = defineEmits(['update:modelValue']);

const tomSelect = ref(null);

onMounted(() => {
  tomSelect.value = new TomSelect("#select-beast", {
    create: true,
    sortField: {
      field: "text",
      direction: "asc"
    },
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    options: props.items,
    onChange: function (event) {
      console.log('ok: ', event);
    }
  });

  // var form = document.getElementById('bootstrap-form')
  // form.addEventListener('submit', function (event) {

  //   // add was-validated to display custom colors
  //   form.classList.add('was-validated')

  //   // or, add is-invalid to the wrapper to display custom colors and invalid-feedback messages
  //   my_select.wrapper.classList.toggle('is-invalid', !my_select.isValid);

  //   if (!form.checkValidity()) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }

  // }, false)
});

function handleChange(event) {
  console.log('event: ', event);
}

</script>

<template>
  <select
    id="select-beast"
    required
    placeholder="Select a person..."
    autocomplete="off"
    class="tom-select"
    @change="handleChange"
    v-model="modelValue"
  />
</template>
