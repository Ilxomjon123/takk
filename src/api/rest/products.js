import makeRequest from '../makeRequest';

export const fetchProductsList = async payload => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${payload.menuId}/products/?page=${payload.page}&limit=${payload.limit}`,
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
    console.log('payload in product create func: ', payload);
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

export const deleteProduct = async productID => {
  try {
    const res = await makeRequest({
      url: `/api/products/${productID}/`,
      method: 'delete',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting Product data: ', err);
    throw err;
  }
};

export const fetchSelectedMenuCategories = async menuID => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${menuID}/categories/`,
      method: 'get',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting Product data: ', err);
    throw err;
  }
};

export const fetchSelectedMenuModifiers = async menuID => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${menuID}/modifiers/`,
      method: 'get',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting Product data: ', err);
    throw err;
  }
};
