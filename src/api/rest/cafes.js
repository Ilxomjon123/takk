import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchCafeList = async () => {
  try {
    const res = await api({
      url: `/api/cafes/`
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCafe = async cafeID => {
  try {
    const res = await api({
      url: `/api/cafes/${cafeID}/`
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCafeGallery = async cafeID => {
  try {
    const res = await api({
      url: `/api/cafes/${cafeID}/photos/`
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCafeWorkDays = async cafeID => {
  try {
    const res = await api({
      url: `/api/cafes/${cafeID}/work-days/`
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCafeWorkDays = async payload => {
  try {
    const res = await api({
      url: `/api/cafes/${payload.id}/work-days/`,
      method: 'put',
      data: payload.data
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCafe = async payload => {
  try {
    const res = await api({
      url: `/api/cafes/${payload.id}/`,
      method: 'put',
      data: payload.data
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const storeCafe = async payload => {
  try {
    const res = await api({
      url: `/api/cafes/`,
      method: 'post',
      data: payload
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCafeGallery = async payload => {
  try {
    const res = await api({
      url: `/api/cafes/photos/`,
      method: 'post',
      data: payload
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCafe = async payload => {
  try {
    const res = await api({
      url: `/api/cafes/${payload}/`,
      method: 'delete'
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCafeImage = async imageID => {
  try {
    const res = await api({
      url: `/api/cafes/photos/${imageID}/`,
      method: 'delete'
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
