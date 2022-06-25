import { computed, ref } from 'vue';
import { fetchCities, fetchCountries, fetchStates } from '../api';
// import countries from '@/assets/json/countries.json';
// import allStates from '@/assets/json/states.json';

const countries = ref([]);
const states = ref([]);
const cities = ref([]);

const selectedCountry = ref();
const selectedState = ref();
const selectedCity = ref();

export default () => {
  const setSelectedCountry = async payload => {
    selectedCountry.value = payload;
    await getStates(selectedCountry.value);
  };

  const setSelectedState = async payload => {
    selectedState.value = payload;
    await getCities();
  };

  const setSelectedCity = async payload => {
    selectedCity.value = payload;
  };

  const getCountries = async () => {
    try {
      countries.value = [];
      const res = await fetchCountries();
      countries.value = res;
    } catch (error) {
      console.log('Error while fetching countries: ', error.message);
    }
  };

  const getStates = async () => {
    try {
      states.value = [];
      const res = await fetchStates(selectedCountry.value);
      states.value = res;
    } catch (error) {
      console.log(
        'Error while fetching states of selected country: ',
        error.message
      );
    }
  };

  const getCities = async () => {
    try {
      cities.value = [];
      const res = await fetchCities(selectedCountry.value, selectedState.value);
      cities.value = res;
    } catch (error) {
      console.log(
        'Error while fetching cities of selected country and state: ',
        error.message
      );
    }
  };

  return {
    countriesList: computed(() => countries.value),
    statesList: computed(() => states.value),
    citiesList: computed(() => cities.value),
    selectedCountry: computed(() => selectedCountry.value),
    selectedState: computed(() => selectedState.value),
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    getCountries,
    getStates,
    getCities
  };
};
