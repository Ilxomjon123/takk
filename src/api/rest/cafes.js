import makeRequest from '../makeRequest';

export const cafeList = async companyId => {
  try {
    const res = await makeRequest({
      url: `/companies/${companyId}`,
      headers: { authorization: true }
    });

    return res.data.cafes;
  } catch (err) {
    return console.log('error while fetching cafes: ', err);
  }
};
