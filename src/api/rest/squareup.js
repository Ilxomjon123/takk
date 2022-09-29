import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchSquareRedirectUrl = async (payload) => {
  try {
    const { data } = await api.post(`/api/square/redirect/`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postSquareAuth = async (payload) => {
  try {
    const { data } = await api.post(`/api/square/auth/`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const syncSquare = async () => {
  try {
    const res = await api.get('/api/square/locations/parse/');
    return res;
  } catch (error) {
    throw error;
  }
};
