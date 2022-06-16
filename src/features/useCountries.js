import { computed, ref } from 'vue';
import { fetchCities, fetchCountries, fetchStates } from '../api';
import countries from '@/utils/countries.json';
import allStates from '@/utils/states.json';
import allCities from '@/utils/cities.json';

// const countries = ref([]);
const states = ref([]);
const cities = ref([]);

const selectedCountry = ref({
  iso2: 'US',
  name: 'United States'
});
const selectedState = ref('');
const selectedCity = ref('');

export default () => {
  const fetchStates = async countryCode => {
    try {
      states.value = [];
      const res = allStates.filter(({ name, state_code }) => ({
        name,
        state_code
      }));
      states.value = res;
    } catch (error) {
      console.log(
        'Error while fetching states of selected country: ',
        error.message
      );
    }
  };

  const fetchCities = async () => {
    try {
      cities.value = [];
      const res = selectedState.value.cities;
      cities.value = res;
    } catch (error) {
      console.log(
        'Error while fetching cities of selected country: ',
        error.message
      );
    }
  };

  const setSelectedCountry = async payload => {
    const country = countries.value.find(
      item => item.iso2 === payload || item.name === payload
    );

    if (country) {
      selectedCountry.value = country;
      await fetchStates(country.country_name);
    }
  };

  const setSelectedState = async payload => {
    const state = states.value.find(
      item => item.state_code === payload || item.name === payload
    );

    if (state) {
      const { state_code, name } = state;
      selectedState.value = { state_code, name };
      await fetchCities(name);
    }
  };

  // const setSelectedCity = async payload => {
  //   selectedCity.value = payload;
  // };

  return {
    countriesList: computed(() => countries),
    statesList: computed(() => states),
    citiesList: computed(() => cities.value),
    selectedCountry: computed(() => selectedCountry.value),
    selectedState: computed(() => selectedState.value),
    setSelectedCountry,
    setSelectedState,
    // setSelectedCity,
    fetchStates,
    fetchCities
  };
};
