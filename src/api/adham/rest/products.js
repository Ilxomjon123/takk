import makeRequest from '../makeRequest';

export const fetchProductsList = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/menus/${payload.menuId}/products/?search=${payload.search}&page=${payload.page}&limit=${payload.limit}`,
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching Products: ', err);
  }
};

export const fetchProduct = async productID => {
  try {
    const res = await makeRequest({
      url: `/adham/products/${productID}/`,
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching Products: ', err);
  }
};

export const fetchProductSizes = async productSizeID => {
  try {
    const res = await makeRequest({
      url: `/adham/products/sizes/${productSizeID}/`,
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
      url: `/adham/products/${payload.id}/`,
      method: 'put',
      data: payload.data,
      headers: { authorization: true, 'Content-Type': 'multipart/form-data' }
    });

    return res.data;
  } catch (err) {
    console.log('error while updating Product: ', err);
    throw err;
  }
};

export const createProduct = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/products/`,
      method: 'post',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while saving Product data: ', err);
    throw err;
  }
};

export const duplicateProduct = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/products/duplicate/`,
      method: 'post',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while saving Product data: ', err);
    throw err;
  }
};

export const isProductAvailable = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/products/available/`,
      method: 'post',
      data: payload,
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
      url: `/adham/products/${productID}/`,
      method: 'delete',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting Product data: ', err);
    throw err;
  }
};