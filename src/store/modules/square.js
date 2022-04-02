import axios from 'axios';

const state = () => {};

const getters = {};

const mutations = {};

const actions = {
  async fetchSquareRedirectUrl({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/api/square/redirect/`, payload, {
        headers: {
          ...rootGetters.getHttpHeader
        }
      })
      .then(async res => {
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
  async postSquareAuth({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/api/square/auth/`, payload, {
        headers: {
          ...rootGetters.getHttpHeader
        }
      })
      .then(function(res) {
        console.log(res, 'then');
        response = {
          status: true,
          data: res.data
        };
      })
      .catch(function(err) {
        console.log(err, 'catch');
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
