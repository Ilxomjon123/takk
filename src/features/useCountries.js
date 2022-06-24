import { computed, ref } from 'vue';
import { fetchCitiesList, fetchCountries, fetchStates } from '../api';
import countries from '@/assets/json/countries.json';
import allStates from '@/assets/json/states.json';

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
  const setSelectedCountry = async payload => {
    const country = await countries.find(
      country => country.iso2 === payload || country.name === payload
    );
    console.log({ country });

    if (country) {
      selectedCountry.value = country;
      await fetchStates(country.name);
    }
  };

  const setSelectedState = async payload => {
    const state = states.value.find(
      item => item.state_code === payload || item.name === payload
    );

    if (state) {
      console.log({ state });
      selectedState.value = state.name;
      await fetchCities(selectedState.value);
    }
  };

  const setSelectedCity = async payload => {
    selectedCity.value = payload;
  };

  const fetchStates = async countryName => {
    try {
      states.value = [];
      const res = allStates.filter(state => state.country_name == countryName);
      states.value = res;
    } catch (error) {
      console.log(
        'Error while fetching states of selected country: ',
        error.message
      );
    }
  };

  const fetchCities = async stateName => {
    try {
      cities.value = [];
      const res = await fetchCitiesList(selectedCountry.value.name, stateName);
      cities.value = res;
    } catch (error) {
      console.log(
        'Error while fetching cities of selected country: ',
        error.message
      );
    }
  };

  return {
    countriesList: computed(() => countries),
    statesList: computed(() => states.value),
    citiesList: computed(() => cities.value),
    selectedCountry: computed(() => selectedCountry.value),
    selectedState: computed(() => selectedState.value),
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    fetchStates,
    fetchCities
  };
};
