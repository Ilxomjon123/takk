import makeRequest from '../makeRequest';

export const fetchCompanyList = async (limit = 10, page = 1) => {
  try {
    const res = await makeRequest({
      url: `/adham/companies/?page=${page}&limit=${limit}`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyById = async id => {
  try {
    const res = await makeRequest({
      url: `/adham/companies/${id}/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyById = async (id, payload) => {
  try {
    const res = await makeRequest({
      url: `/adham/companies/${id}/`,
      method: 'PUT',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/companies/`,
      method: 'POST',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeCompanyById = async id => {
  try {
    const res = await makeRequest({
      url: `/adham/companies/${id}/`,
      method: 'DELETE',
      headers: { authorization: true }
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
