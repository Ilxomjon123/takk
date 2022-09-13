import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchCafeList = async (payload = { limit: 10, company: '' }) => {
  try {
    const res = await api({
      url: `/admn/cafes/`,
      params: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCafe = async (cafeID) => {
  try {
    const res = await api({
      url: `/admn/cafes/${cafeID}/`,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCafeGallery = async (cafeID) => {
  try {
    const res = await api({
      url: `/admn/cafes/${cafeID}/photos/`,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCafeWorkDays = async (cafeID) => {
  try {
    const res = await api({
      url: `/admn/cafes/${cafeID}/work-days/`,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateCafeWorkDays = async (payload) => {
  try {
    const res = await api({
      url: `/admn/cafes/${payload.id}/work-days/`,
      method: 'PUT',
      data: payload.data,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateCafe = async (payload) => {
  try {
    const res = await api({
      url: `/admn/cafes/${payload.id}/`,
      method: 'PUT',
      data: payload.data,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const storeCafe = async (payload) => {
  try {
    const res = await api({
      url: `/admn/cafes/`,
      method: 'POST',
      data: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addCafeGallery = async (payload) => {
  try {
    const res = await api({
      url: `/admn/cafes/photos/`,
      method: 'POST',
      data: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCafe = async (payload) => {
  try {
    const res = await api({
      url: `/admn/cafes/${payload}/`,
      method: 'DELETE',
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCafeImage = async (imageID) => {
  try {
    const res = await api({
      url: `/admn/cafes/photos/${imageID}/`,
      method: 'DELETE',
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
