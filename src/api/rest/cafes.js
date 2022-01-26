import makeRequest from '../makeRequest';

const companyId = JSON.parse(localStorage.getItem('required_details'))?.user
  ?.company_id;

export const fetchCafeList = async () => {
  try {
    const res = await makeRequest({
      url: `/api/companies/${companyId}/`,
      headers: { authorization: true }
    });

    return res.data.cafes;
  } catch (err) {
    return console.log('error while fetching cafes: ', err);
  }
};

export const fetchCafe = async cafeId => {
  try {
    const res = await makeRequest({
      url: `/api/cafes/${cafeId}/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while fetching cafes: ', err);
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

export const cafePost = async payload => {
  const data = { ...payload, company: companyId };

  try {
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
