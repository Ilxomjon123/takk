import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

const token = useStorage('token', null);

export const setToken = value => {
  token.value = value;
  // localStorage.setItem('token', value);
};

export const getToken = computed(() => token.value);
// export const getToken = () => token.value || localStorage.getItem('token');
export const errorHandler = (err, { url, method, headers, params, data }) => {
  // do smth to inform user about error
};
