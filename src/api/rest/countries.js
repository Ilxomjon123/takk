import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchCountries = async () => {
  try {
    const res = await api({
      url: `/api/location/countries/`,
      params: {
        limit: 250
      }
    });

    return res.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchStates = async countryCode => {
  try {
    const res = await api({
      url: `/api/location/states/`,
      params: {
        country: countryCode,
        limit: 100
      }
    });

    return res.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchCities = async (countryCode, stateCode) => {
  try {
    const res = await api({
      url: `/api/location/cities`,
      params: {
        country: countryCode,
        state: stateCode,
        limit: 1000
      }
    });

    return res.data.results;
  } catch (error) {
    throw error;
  }
};
