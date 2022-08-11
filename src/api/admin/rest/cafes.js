import makeRequest from '../makeRequest';
import { useStorage } from '@vueuse/core';

const companyId = useStorage('selectedCompanyID', 0);

export const fetchCafeList = async (limit = 10) => {
  const company = companyId.value === 0 ? '' : companyId.value;
  try {
    const res = await makeRequest({
      url: `/adham/cafes/?company=${company}&limit=${limit}`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    return console.log('error while fetching cafes: ', err);
  }
};

export const fetchCafe = async cafeID => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/${cafeID}/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while fetching cafes: ', err);
    throw err;
  }
};

export const fetchCafeGallery = async cafeID => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/${cafeID}/photos/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while fetching cafes: ', err);
    throw err;
  }
};

export const fetchCafeWorkDays = async cafeID => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/${cafeID}/work-days/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while fetching cafes work days: ', err);
    throw err;
  }
};

export const updateCafeWorkDays = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/${payload.id}/work-days/`,
      method: 'PUT',
      data: payload.data,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while fetching cafes work days: ', err);
    throw err;
  }
};

export const updateCafe = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/${payload.id}/`,
      method: 'PUT',
      data: payload.data,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while updating cafes: ', err);
    throw err;
  }
};

export const storeCafe = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/`,
      method: 'POST',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while saving cafe data: ', err);
    throw err;
  }
};

export const addCafeGallery = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/photos/`,
      method: 'POST',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while saving cafe data: ', err);
    throw err;
  }
};

export const deleteCafe = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/${payload}/`,
      method: 'DELETE',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting cafe data: ', err);
    throw err;
  }
};

export const deleteCafeImage = async imageID => {
  try {
    const res = await makeRequest({
      url: `/adham/cafes/photos/${imageID}/`,
      method: 'DELETE',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting cafe data: ', err);
    throw err;
  }
};
