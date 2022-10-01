import { useApi } from '@/composables/useApi';

const api = useApi();

export const storeCompany = async (payload) => {
  try {
    const { data } = await api({
      url: `/api/companies/create/`,
      method: 'POST',
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (payload) => {
  try {
    const { data } = await api({
      url: `/api/companies/`,
      method: 'PUT',
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentTariff = async () => {
  try {
    const { data } = await api({
      url: '/api/companies/tariff/',
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTariff = async (payload) => {
  try {
    const { data } = await api({
      url: '/api/companies/tariff/',
      method: 'PUT',
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
