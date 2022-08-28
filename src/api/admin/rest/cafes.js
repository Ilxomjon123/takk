import { useStorage } from '@vueuse/core';
import { useApi } from '@/composables/useApi';

const api = useApi();
const companyId = useStorage('selectedCompanyID', 0);

export const fetchCafeList = async (limit = 10) => {
  const company = companyId.value === 0 ? '' : companyId.value;
  try {
    const res = await api({
      url: `/adham/cafes/?company=${company}&limit=${limit}`
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCafe = async cafeID => {
  try {
    const res = await api({
      url: `/adham/cafes/${cafeID}/`
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCafeGallery = async cafeID => {
  try {
    const res = await api({
      url: `/adham/cafes/${cafeID}/photos/`
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCafeWorkDays = async cafeID => {
  try {
    const res = await api({
      url: `/adham/cafes/${cafeID}/work-days/`
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateCafeWorkDays = async payload => {
  try {
    const res = await api({
      url: `/adham/cafes/${payload.id}/work-days/`,
      method: 'PUT',
      data: payload.data
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateCafe = async payload => {
  try {
    const res = await api({
      url: `/adham/cafes/${payload.id}/`,
      method: 'PUT',
      data: payload.data
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const storeCafe = async payload => {
  try {
    const res = await api({
      url: `/adham/cafes/`,
      method: 'POST',
      data: payload
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addCafeGallery = async payload => {
  try {
    const res = await api({
      url: `/adham/cafes/photos/`,
      method: 'POST',
      data: payload
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCafe = async payload => {
  try {
    const res = await api({
      url: `/adham/cafes/${payload}/`,
      method: 'DELETE'
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCafeImage = async imageID => {
  try {
    const res = await api({
      url: `/adham/cafes/photos/${imageID}/`,
      method: 'DELETE'
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
