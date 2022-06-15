import axios from 'axios';

const state = () => {
  return {
    countries: [],
    cities: [],
    selectedCountry: 'United States',
    selectedCity: '',
    loadingStatus: false,
    successNotificationStatus: false,
    errorNotificationStatus: false,
    statesList: [
      { value: 'AK', name: 'Alaska' },
      { value: 'TX', name: 'Texas' },
      { value: 'AL', name: 'Alabama' },
      { value: 'AR', name: 'Arkansas' },
      { value: 'AZ', name: 'Arizona' },
      { value: 'CA', name: 'California' },
      { value: 'CO', name: 'Colorado' },
      { value: 'CT', name: 'Connecticut' },
      { value: 'DC', name: 'DistrictofColumbia' },
      { value: 'DE', name: 'Delaware' },
      { value: 'FL', name: 'Florida' },
      { value: 'GA', name: 'Georgia' },
      { value: 'HI', name: 'Hawaii' },
      { value: 'IA', name: 'Iowa' },
      { value: 'ID', name: 'Idaho' },
      { value: 'IL', name: 'Illinois' },
      { value: 'IN', name: 'Indiana' },
      { value: 'KS', name: 'Kansas' },
      { value: 'KY', name: 'Kentucky' },
      { value: 'LA', name: 'Louisiana' },
      { value: 'MA', name: 'Massachusetts' },
      { value: 'MD', name: 'Maryland' },
      { value: 'ME', name: 'Maine' },
      { value: 'MI', name: 'Michigan' },
      { value: 'MN', name: 'Minnesota' },
      { value: 'MO', name: 'Missouri' },
      { value: 'MS', name: 'Mississippi' },
      { value: 'MT', name: 'Montana' },
      { value: 'NC', name: 'NorthCarolina' },
      { value: 'ND', name: 'NorthDakota' },
      { value: 'NE', name: 'Nebraska' },
      { value: 'NH', name: 'NewHampshire' },
      { value: 'NJ', name: 'NewJersey' },
      { value: 'NM', name: 'NewMexico' },
      { value: 'NV', name: 'Nevada' },
      { value: 'NY', name: 'NewYork' },
      { value: 'OH', name: 'Ohio' },
      { value: 'OK', name: 'Oklahoma' },
      { value: 'OR', name: 'Oregon' },
      { value: 'PA', name: 'Pennsylvania' },
      { value: 'RI', name: 'RhodeIsland' },
      { value: 'SC', name: 'SouthCarolina' },
      { value: 'SD', name: 'SouthDakota' },
      { value: 'TN', name: 'Tennessee' },
      { value: 'TX', name: 'Texas' },
      { value: 'UT', name: 'Utah' },
      { value: 'VA', name: 'Virginia' },
      { value: 'VT', name: 'Vermont' },
      { value: 'WA', name: 'Washington' },
      { value: 'WI', name: 'Wisconsin' },
      { value: 'WV', name: 'WestVirginia' },
      { value: 'WY', name: 'Wyoming' }
    ]
  };
};

const getters = {
  getCountries: state => state.countries,
  getStatesList: state => state.statesList,
  getSelectedCountry: state => {
    return state.selectedCountry;
  },
  getCities: state => state.cities,
  getSelectedCity: state => state.selectedCity,
  getLoadingStatus: state => state.loadingStatus,
  getSuccessNotificationStatus: state => state.successNotificationStatus,
  getErrorNotificationStatus: state => state.errorNotificationStatus
};
const mutations = {
  setCountries(state, payload) {
    state.countries = payload;
  },
  setCities(state, payload) {
    state.cities = payload;
  },
  setSelectedCountry(state, payload) {
    state.selectedCountry = payload;
  },
  setSelectedCity(state, payload) {
    state.selectedCity = payload;
  },
  setLoadingStatus(state, payload) {
    state.loadingStatus = payload;
  },
  setSuccessNotification(state, payload = true) {
    state.successNotificationStatus = payload;
  },
  setErrorNotification(state, payload = true) {
    state.errorNotificationStatus = payload;
  }
};

const actions = {
  // async fetchCountries({ commit, rootGetters, dispatch }) {
  //   /* const res = await  */ axios
  //     .get('/api/countries/', {
  //       headers: rootGetters.getHttpHeader
  //     })
  //     .then(res => {
  //       commit('setCountries', res.data);
  //     })
  //     .catch(err => {
  //       commit('setCountries', err.response.data);
  //     });
  // },
  // async fetchCities({ commit, getters, rootGetters }) {
  //   axios
  //     .get('/api/countries/', {
  //       headers: rootGetters.getHttpHeader,
  //       params: {
  //         country: getters.getSelectedCountry
  //       }
  //     })
  //     .then(res => {
  //       commit('setCities', res.data);
  //     })
  //     .catch(err => {
  //       commit('setCities', err.response.data);
  //     });
  // },
  // async fetchCitiesByCountry({ commit, rootGetters }, payload) {
  //   axios
  //     .get('/api/countries/', {
  //       headers: rootGetters.getHttpHeader,
  //       params: {
  //         country: payload
  //       }
  //     })
  //     .then(res => {
  //       commit('setCities', res.data);
  //     })
  //     .catch(err => {
  //       commit('setCities', err.response.data);
  //     });
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
