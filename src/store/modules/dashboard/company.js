import axios from 'axios';

const state = () => {
  return {
    company: [{}],
    customers: [],
    transactions: []
  };
};

const getters = {
  getCompany: (state, getters) => {
    let result = state.company.find(el => el.id == getters.getCompanyId);
    if (result == null) {
      result = state.company[0];
    }
    return result;
  },
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
    let response;
    await axios
      // .get(`/api/companies/${rootGetters.getCompanyId}/customers/`, {
      .get(`/api/customers/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setCustomers', res.data);
      })
      .catch(err => {
        response = res.data;
        // commit('setCustomers', err.response.data);
      });
    return response;
  },
  async fetchTransactions({ commit, rootGetters }, payload) {
    let response;
    await axios
      // .get(`/api/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`/api/transactions/`, {
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
