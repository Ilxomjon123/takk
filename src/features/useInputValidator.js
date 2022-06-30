import { computed, ref } from 'vue';

export default (startVal, onValidate) => {
  let input = ref(startVal);
  computed(() => onValidate(input.value));

  return input;
};
