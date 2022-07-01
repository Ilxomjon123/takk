import axios from 'axios';

const state = () => {
  return {
    company: {},
    customers: [],
    transactions: []
  };
};

const getters = {
  getCompany: state => state.company,
  getCustomers: state => state.customers,
  getTransactions: state => state.transactions
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  },
  setCustomers(state, payload) {
    state.customers = payload;
  },
  setTransactions(state, payload) {
    state.transactions = payload;
  }
};

const actions = {
  async fetchCompany({ commit, rootGetters }) {
    await axios
      .get('/api/companies/', {
        headers: rootGetters.getHttpHeader,
        params: {
          id: rootGetters.getCompanyId
        }
      })
      .then(res => {
        commit('setCompany', res.data);
        // commit('cafes/setCafeList', res.data.cafes, { root: true });
      })
      .catch(err => {
        commit('setCompany', err.response.data);
      });
  },

  async putCompany({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/api/companies/`, payload.form, {
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
          data: err.response?.data
        };
      });
    return response;
  },

  async fetchCustomers({ commit, rootGetters }, payload) {
    let response;
    await axios
      // .get(`/api/companies/${rootGetters.getCompanyId}/customers/`, {
      .get(`/api/companies/customers/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setCustomers', res.data);
      })
      .catch(err => {
        console.log(err);
        // commit('setCustomers', err.response.data);
      });
    return response;
  },

  async fetchTransactions({ commit, rootGetters }, payload) {
    let response;
    await axios
      // .get(`/api/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`/api/companies/transactions/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setTransactions', res.data);
      })
      .catch(err => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async fectStripeConnect({ commit, rootGetters }) {
    let response;
    await axios
      // .get(`/api/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`/api/stripe/connect/`, {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
        response = { status: tre, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
        // commit('setTransactions', err.response.data);
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
