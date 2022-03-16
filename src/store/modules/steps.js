import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const state = () => {};

const getters = {};

const mutations = {};

const actions = {
  async postCompany({ commit, rootGetters, rootState, dispatch }, payload) {
    let response;
    await axios
      .post('/api/companies/create/', payload, {
        headers: rootGetters.getHttpHeader
      })
      .then(async res => {
        await dispatch('putStep', rootState.user.STEP_CAFE);
        // await dispatch('setCompanyId', res.data.id);

        response = {
          status: true,
          data: res.data
        };
      })
      .catch(err => {
        response = {
          status: false,
          data: err.response.data
        };
      });
    return response;
  },
  async postCafe({ commit, rootGetters, rootState, dispatch }, payload) {
    let response;
    await axios
      .post('/api/cafes/', payload, {
        headers: rootGetters.getHttpHeader
      })
      .then(async res => {
        await dispatch('putStep', rootState.user.STEP_FINISH);
        // await dispatch('putStep', rootState.user.STEP_MENU);

        response = {
          status: true,
          data: res.data
        };
      })
      .catch(err => {
        response = {
          status: false,
          data: err.response.data
        };
      });
    return response;
  },
  async postStepMenu({ commit, rootGetters, rootState, dispatch }, payload) {
    let response;
    await axios
      .post('/api/menus/', payload, {
        headers: rootGetters.getHttpHeader
      })
      .then(async res => {
        await dispatch('putStep', rootState.user.STEP_DASHBOARD);
        response = {
          status: true,
          data: res.data
        };
      })
      .catch(err => {
        response = {
          status: false,
          data: err.response.data
        };
      });
    return response;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
