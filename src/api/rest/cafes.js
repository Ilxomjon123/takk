import makeRequest from '../makeRequest';

export const fetchCafeList = async () => {
  try {
    const res = await makeRequest({
      url: `/admn/cafes/`,
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
      url: `/api/cafes/${cafeID}/`,
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
      url: `/api/cafes/${cafeID}/photos/`,
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
      url: `/api/cafes/${cafeID}/work-days/`,
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
      url: `/api/cafes/${payload.id}/work-days/`,
      method: 'put',
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
      url: `/api/cafes/${payload.id}/`,
      method: 'put',
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
    const companyId = JSON.parse(localStorage.getItem('required_details'))?.user
      ?.company_id;
    const data = { ...payload, company: companyId };
    const res = await makeRequest({
      url: `/api/cafes/`,
      method: 'post',
      data,
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
      url: `/api/cafes/photos/`,
      method: 'post',
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
      url: `/api/cafes/${payload}/`,
      method: 'delete',
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
      url: `/api/cafes/photos/${imageID}/`,
      method: 'delete',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting cafe data: ', err);
    throw err;
  }
};
