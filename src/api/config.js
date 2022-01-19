import { ref } from 'vue';

const token = ref(null);

export const setToken = value => (token.value = value);
export const getToken = () => token.value;
export const errorHandler = (err, { url, method, headers, params, data }) => {
  // do smth to inform user about error
};
