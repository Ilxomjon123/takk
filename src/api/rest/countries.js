import makeRequest from '../makeRequest';

export const fetchCountries = async () => {
  try {
    const res = await makeRequest({
      url: `/api/location/countries/`,
      headers: { authorization: true },
      params: {
        limit: 250
      }
    });

    return res.data.results;
  } catch (err) {
    return console.log('error while fetching countries list: ', err);
  }
};

export const fetchStates = async countryCode => {
  try {
    const res = await makeRequest({
      url: `/api/location/states/`,
      params: {
        country: countryCode,
        limit: 100
      },
      headers: { authorization: true }
    });

    return res.data.results;
  } catch (err) {
    console.log('error while fetching states list: ', err);
    throw err;
  }
};

export const fetchCities = async (countryCode, stateCode) => {
  console.log({ countryCode, stateCode });
  try {
    const res = await makeRequest({
      url: `/api/location/cities`,
      params: {
        country: countryCode,
        state: stateCode,
        limit: 1000
      },
      headers: { authorization: true }
    });

    return res.data.results;
  } catch (err) {
    console.log('error while fetching cities list: ', err);
    throw err;
  }
};
