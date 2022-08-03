import makeRequest from '../makeRequest';

export const user = async () => {
  try {
    return await makeRequest({
      url: '/api/products',
      headers: { authorization: true }
    });
  } catch (err) {
    return console.log('error while fetching products: ', err);
  }
};
