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
