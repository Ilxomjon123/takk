import axios from 'axios';

const state = () => {};

const getters = {};

const mutations = {};

const actions = {
  async postCompany({ commit, rootGetters }, payload) {
    let response;
    await axios
      .post('/api/companies/', payload, {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
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
  async postCafe({ commit, rootGetters }, payload) {
    let response;
    await axios
      .post('/api/cafes/', payload, {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
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
  namecpaced: true,
  state,
  getters,
  actions,
  mutations
};
