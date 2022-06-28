import axios from 'axios';
const DEFAULT_SUCCESS_MESSAGE = 'Successfully!';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong!';
const state = () => {
  return {
    countries: [],
    cities: [],
    selectedCountry: 'United States',
    selectedCity: '',
    loadingStatus: false,
    successNotificationStatus: false,
    errorNotificationStatus: false,
    successNotificationMessage: DEFAULT_SUCCESS_MESSAGE,
    errorNotificationMessage: DEFAULT_ERROR_MESSAGE,
    statesList: []
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
  getErrorNotificationStatus: state => state.errorNotificationStatus,
  getSuccessNotificationMessage: state => state.successNotificationMessage,
  getErrorNotificationMessage: state => state.errorNotificationMessage
};
const mutations = {
  setNotificationsDefault(state) {
    state.successNotificationMessage = DEFAULT_SUCCESS_MESSAGE;
    state.errorNotificationMessage = DEFAULT_ERROR_MESSAGE;
    state.successNotificationStatus = false;
    state.errorNotificationStatus = false;
  },
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
  },
  setSuccessNotificationMessage(state, payload) {
    state.successNotificationMessage = payload;
    state.successNotificationStatus = true;
  },
  setErrorNotificationMessage(state, payload) {
    state.errorNotificationMessage = payload;
    state.errorNotificationStatus = true;
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
