import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchSquareRedirectUrl = async (payload) => {
  try {
    const { data } = await api({
      url: `/api/square/redirect/`,
      method: 'POST',
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const postSquareAuth = async (payload) => {
  try {
    const { data } = await api({
      url: `/api/square/auth/`,
      method: 'POST',
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const syncSquare = async () => {
  try {
    const res = await api({
      url: '/api/square/locations/parse/',
    });

    return res;
  } catch (error) {
    throw error;
  }
};
