import makeRequest from '../makeRequest';

export const fetchProductsList = async menuId => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${menuId}/products/`,
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching Products: ', err);
  }
};

export const updateProduct = async payload => {
  try {
    const res = await makeRequest({
      url: `/api/products/${payload.id}/`,
      method: 'put',
      data: payload.data,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while updating Product: ', err);
    throw err;
  }
};

export const createProduct = async payload => {
  try {
    // const companyId = JSON.parse(localStorage.getItem('required_details'))?.user
    //   ?.company_id;
    const data = { ...payload };
    const res = await makeRequest({
      url: `/api/products/`,
      method: 'post',
      data,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while saving Product data: ', err);
    throw err;
  }
};

export const deleteFoodMenu = async payload => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${payload}/`,
      method: 'delete',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting Product data: ', err);
    throw err;
  }
};
