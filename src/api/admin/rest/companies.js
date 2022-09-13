import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchCompanyList = async (limit = 10, page = 1) => {
  try {
    const res = await api({
      url: `https://api.takk.cafe/api/v1/dashboard/admin/companies/?page=${page}&limit=${limit}`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyById = async (id) => {
  try {
    const { data } = await api({
      url: `https://api.takk.cafe/api/v1/dashboard/admin/companies/${id}/`,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyById = async (id, payload) => {
  try {
    const res = await api({
      url: `https://api.takk.cafe/api/v1/dashboard/admin/companies/${id}/`,
      method: 'PUT',
      data: payload,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async (payload) => {
  try {
    const res = await api({
      url: `https://api.takk.cafe/api/v1/dashboard/admin/companies/`,
      method: 'POST',
      data: payload,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeCompanyById = async (id) => {
  try {
    const res = await api({
      url: `https://api.takk.cafe/api/v1/dashboard/admin/companies/${id}/`,
      method: 'DELETE',
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
