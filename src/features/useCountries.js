import { computed, ref } from 'vue';
import { fetchCities, fetchCountries, fetchStates } from '../api';
import countries from '@/utils/country-state-city.json';
// import states from '@/utils/states.json';

// const countries = ref([]);
// const states = ref([]);
const cities = ref([]);

// const selectedCountry = ref({
//   country_code: 'US',
//   country_name: 'United States'
// });
// const selectedState = ref('');
// const selectedCity = ref('');

export default () => {
  // const searchCountries = async () => {
  //   try {
  //     const res = await fetchCountries();
  //     countries.value = res;
  //   } catch (error) {
  //     console.log(
  //       'Error while fetching countries of selected country: ',
  //       error.message
  //     );
  //   }
  // };

  const fetchStates = async countryCode => {
    try {
      states.value = [];
      const res = await fetchStates(countryCode);
      states.value = res;
    } catch (error) {
      console.log(
        'Error while fetching states of selected country: ',
        error.message
      );
    }
  };

  const fetchCities = async (country, state) => {
    try {
      cities.value = [];
      const res = await fetchCities(country, state);
      cities.value = res;
    } catch (error) {
      console.log(
        'Error while fetching cities of selected country: ',
        error.message
      );
    }
  };

  // const setSelectedCountry = async payload => {
  //   if (payload) {
  //     const country = countries.value.find(
  //       item => item.country_code === payload || item.country_name === payload
  //     );

  //     if (country) {
  //       selectedCountry.value = country;
  //       if (country.country_code === 'US') {
  //         await fetchStates(country.country_name);
  //       } else {
  //         console.log('in setSelectedCountry');
  //         await fetchCities(country.country_name);
  //       }
  //     }
  //   }
  // };

  // const setSelectedState = async payload => {
  //   selectedState.value = payload;
  // };

  // const setSelectedCity = async payload => {
  //   selectedCity.value = payload;
  // };

  return {
    countriesList: computed(() => countries),
    statesList: computed(() => states),
    citiesList: computed(() => cities.value),
    // selectedCountry: computed(() => selectedCountry.value),
    // selectedState: computed(() => selectedState.value),
    // setSelectedCountry,
    // setSelectedState,
    // setSelectedCity,
    // searchCountries,
    // fetchStates,
    fetchCities
  };
};
