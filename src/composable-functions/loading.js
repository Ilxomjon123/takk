import { ref } from 'vue';

const loading = ref(false);
export default () => {
  const setLoading = value => {
    loading.value = value;
  };

  const isLoading = () => {
    return loading.value;
  };

  return { setLoading, isLoading };
};
