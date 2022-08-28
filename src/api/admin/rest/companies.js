import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchCompanyList = async (limit = 10, page = 1) => {
  try {
    const res = await api({
      url: `/adham/companies/?page=${page}&limit=${limit}`
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyById = async id => {
  try {
    const { data } = await api({
      url: `/adham/companies/${id}/`
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyById = async (id, payload) => {
  try {
    const res = await api({
      url: `/adham/companies/${id}/`,
      method: 'PUT',
      data: payload
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async payload => {
  try {
    const res = await api({
      url: `/adham/companies/`,
      method: 'POST',
      data: payload
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeCompanyById = async id => {
  try {
    const res = await api({
      url: `/adham/companies/${id}/`,
      method: 'DELETE'
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
