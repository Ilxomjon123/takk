import makeRequest from '../makeRequest';

export const fetchCountries = async () => {
  try {
    const res = await makeRequest({
      url: `/api/countries/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    return console.log('error while fetching countries list: ', err);
  }
};

export const fetchCities = async (countryCode, stateCode) => {
  try {
    const res = await makeRequest({
      url: `/api/countries/`,
      params: {
        country: countryCode,
        state: stateCode
      },
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while fetching cities list: ', err);
    throw err;
  }
};
