import axios from 'axios';

const state = () => {
  return {
    countries: [],
    cities: [],
    selectedCountry: 'United States',
    selectedCity: '',
    loadingStatus: false,
    successNotificationStatus: false,
    errorNotificationStatus: false
  };
};

const getters = {
  getCountries: state => state.countries,
  getSelectedCountry: state => state.selectedCountry,
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
  setSuccesNotification(state, payload = true) {
    state.successNotificationStatus = payload;
  },
  setErrorNotification(state, payload = true) {
    state.errorNotificationStatus = payload;
  }
};

const actions = {
  async fetchCountries({ commit, rootGetters, dispatch }) {
    /* const res = await  */ axios
      .get('/api/countries/', {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
        commit('setCountries', res.data);
      })
      .catch(err => {
        commit('setCountries', err.response.data);
      });
  },
  async fetchCities({ commit, getters, rootGetters }) {
    axios
      .get('/api/countries/', {
        headers: rootGetters.getHttpHeader,
        params: {
          country: getters.getSelectedCountry
        }
      })
      .then(res => {
        commit('setCities', res.data);
      })
      .catch(err => {
        commit('setCities', err.response.data);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
