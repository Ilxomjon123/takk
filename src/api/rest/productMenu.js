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
