import makeRequest from '../makeRequest';

export const updateProductPositions = async payload => {
  try {
    const res = makeRequest({
      url: '/api/menus/ordering-items/',
      method: 'post',
      data: payload,
      headers: { authorization: true }
    });
    return (await res).data;
  } catch (error) {
    console.log('error while updating Product: ', err);
    throw err;
  }
};

export const fetchMenus = async () => {
  try {
    const res = await makeRequest({
      url: '/api/menus/',
      headers: { authorization: true }
    });
    return res.data;
  } catch (error) {
    console.log('error while updating Product: ', err);
    throw err;
  }
};

export const fetchSelectedMenuCategories = async (menuID, limit = 10) => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${menuID}/categories/`,
      method: 'get',
      headers: { authorization: true },
      params: {
        limit
      }
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
