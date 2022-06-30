import { computed, ref } from 'vue';

export default function useProduct() {
  const loading = ref(false);
  const products = ref([]);

  const search = async params => {
    loading.value = true;
    products.value = await fetchProduct(params);
    loading.value = false;
  };

  return {
    loading: computed(() => loading.value),
    products: computed(() => products.value),
    search
  };
}
