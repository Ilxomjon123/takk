import makeRequest from '../makeRequest';

export const productList = () => {
  return makeRequest({
    url: '/api/products',
    headers: { authorization: true }
  }).catch(err => console.log('error while fetching products: ', err));
};
