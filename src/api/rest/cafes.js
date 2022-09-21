import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchCafeList = async () => {
  try {
    const res = await api({
      url: `/api/cafes/`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCafe = async (cafeID) => {
  try {
    const res = await api({
      url: `/api/cafes/${cafeID}/`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCafeGallery = async (cafeID) => {
  try {
    const res = await api({
      url: `/api/cafes/${cafeID}/photos/`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCafeWorkDays = async (cafeID) => {
  try {
    const res = await api({
      url: `/api/cafes/${cafeID}/work-days/`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCafeWorkDays = async (payload) => {
  try {
    const res = await api({
      url: `/api/cafes/${payload.id}/work-days/`,
      method: 'PUT',
      data: payload.data,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCafe = async (payload) => {
  try {
    const res = await api({
      url: `/api/cafes/${payload.id}/`,
      method: 'PUT',
      data: payload.data,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const storeCafe = async (payload) => {
  try {
    const res = await api({
      url: `/api/cafes/`,
      method: 'POST',
      data: payload,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCafeGallery = async (payload) => {
  try {
    const res = await api({
      url: `/api/cafes/photos/`,
      method: 'POST',
      data: payload,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCafe = async (payload) => {
  try {
    const res = await api({
      url: `/api/cafes/${payload}/`,
      method: 'DELETE',
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCafeImage = async (imageID) => {
  try {
    const res = await api({
      url: `/api/cafes/photos/${imageID}/`,
      method: 'DELETE',
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCafeStatus = async (payload) => {
  try {
    const res = await api({
      url: `/api/cafes/${payload.id}/`,
      method: 'PUT',
      data: payload.data,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
