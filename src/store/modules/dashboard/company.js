import axios from 'axios';

const state = () => {
  return {
    company: [{}],
    customers: {}
  };
};

const getters = {
  getCompany: state => state.company[0],
  getCustomers: state => state.customers
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  },
  setCustomers(state, payload) {
    state.customers = payload;
  }
};

const actions = {
  async fetchCompany({ commit, rootGetters }) {
    await axios
      .get('/api/companies/', {
        headers: rootGetters.getHttpHeader,
        params: {
          id: rootGetters.getUser.company_id
        }
      })
      .then(res => {
        commit('setCompany', res.data);
        commit('cafes/setCafeList', res.data[0].cafes, { root: true });
      })
      .catch(err => {
        commit('setCompany', err.response.data);
      });
  },
  async putCompany({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/api/companies/${payload.id}/`, payload.form, {
        headers: {
          ...rootGetters.getHttpHeader,
          'Content-Type': 'multipart/form-data'
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
  async fetchCustomers({ commit, rootGetters }, payload) {
    await axios
      .get(`/api/companies/${rootGetters.getUser.company_id}/customers/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        commit('setCustomers', res.data);
      })
      .catch(err => {
        commit('setCustomers', err.response.data);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
