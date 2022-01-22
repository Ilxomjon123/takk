import axios from 'axios';

const state = () => {
  return {
    company: [{}]
  };
};

const getters = {
  getCompany: state => state.company[0]
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  }
};

const actions = {
  async fetchCompany({ commit, rootGetters }) {
    axios
      .get('/api/companies/', {
        headers: rootGetters.getHttpHeader,
        params: {
          id: rootGetters.getUser.company_id
        }
      })
      .then(res => {
        commit('setCompany', res.data);
      })
      .catch(err => {
        commit('setCompany', err.response.data);
      });
  },
  async putCompany({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/api/companies/${payload.id}/`, payload, {
        headers: rootGetters.getHttpHeader
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
