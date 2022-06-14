import { computed, ref } from 'vue';
import { fetchCities } from '../api';
import countries from '@/utils/countries.json';

const cities = ref([]);

export default () => {
  const selectedCountry = ref({
    code: 'US',
    name: 'United States'
  });

  const selectedCity = ref('');

  const searchCities = async (countryCode, stateCode) => {
    try {
      cities.value = [];
      const res = await fetchCities(countryCode, stateCode);
      cities.value = res;
    } catch (error) {
      console.log(
        'Error while fetching cities of selected country: ',
        error.message
      );
    }
  };

  const setSelectedCountry = async payload => {
    if (payload) {
      // console.log('ok');
      const country = countries.find(
        item => item.code === payload || item.name === payload
      );
      selectedCountry.value = country;
      searchCities(country.name);
    }
  };

  return {
    countriesList: computed(() => countries),
    citiesList: computed(() => cities.value),
    selectedCountry: computed(() => selectedCountry.value),
    setSelectedCountry,
    setSelectedCity: val => (selectedCity.value = ''),
    searchCities
  };
};
