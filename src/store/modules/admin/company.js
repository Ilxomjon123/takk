import axios from 'axios';
import { useStorage } from '@vueuse/core';

const state = () => {
  return {
    company: {},
    selectedCompanyID: useStorage('selectedCompanyID', 0),
    companies: [],
    customers: [],
    statisticCustomers: [],
    statisticProducts: [],
    transactions: []
  };
};

const getters = {
  getAdminCompany: state => state.company,
  getAdminSelectedCompanyID: state => state.selectedCompanyID,
  getAdminCompanies: state => state.companies,
  getAdminCustomers: state => state.customers,
  getAdminTransactions: state => state.transactions,
  getAdminStatisticCustomers: state => state.statisticCustomers,
  getAdminStatisticProducts: state => state.statisticProducts,
  getAdminParameter: state => {
    let result = {};
    if (state.selectedCompanyID != 0) {
      result = { company: state.selectedCompanyID };
    }
  }
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  },
  setSelectedCompanyID(state, payload) {
    state.selectedCompanyID = payload;
    // localStorage.setItem('selectedCompanyID', payload);
  },
  setCompanies(state, payload) {
    state.companies = payload;
  },
  setCustomers(state, payload) {
    state.customers = payload;
  },
  setStatisticCustomers(state, payload) {
    state.statisticCustomers = payload;
  },
  setStatisticProducts(state, payload) {
    state.statisticProducts = payload;
  },
  setTransactions(state, payload) {
    state.transactions = payload;
  }
};

const actions = {
  async fetchAdminCompanies({ commit, rootGetters }) {
    await axios
      .get('/adham/companies/', {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
        commit('setCompanies', res.data.results);
      })
      .catch(err => {
        commit('setCompanies', err.response.data);
      });
  },

  async fetchAdminCompany({ commit, rootGetters }) {
    await axios
      .get('/adham/companies/', {
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
      .put(`/adham/companies/${payload.id}/`, payload.form, {
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

  async fetchAdminCustomers({ commit, rootGetters }, payload) {
    let response;
    await axios
      // .get(`/adham/companies/${rootGetters.getCompanyId}/customers/`, {
      .get(`/adham/companies/customers/`, {
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

  async fetchAdminTransactions({ commit, rootGetters }, payload) {
    let response;
    await axios
      // .get(`/adham/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`/adham/companies/transactions/`, {
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
  async fetchAdminStripeConnect({ commit, rootGetters }) {
    let response;
    await axios
      // .get(`/adham/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`/adham/stripe/connect/`, {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async fetchAdminStatisticsSalesYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/sales/year/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsSalesWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/sales/week/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsTransactionYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/transaction/year/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsTransactionWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/transaction/week/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsRegistrationYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/user-register/year/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsRegistrationWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/user-register/week/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsCustomer({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/customers/`, {
        headers: rootGetters.getHttpHeader,
        params: { ...payload, limit: 10 }
      })
      .then(res => {
        commit('setStatisticCustomers', res.data.results);
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsProducts({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/statistics/products/`, {
        headers: rootGetters.getHttpHeader,
        params: { ...payload, limit: 10 }
      })
      .then(res => {
        commit('setStatisticProducts', res.data.results);
        response = { status: true, ...res.data };
      })
      .catch(err => {
        response = { status: false, ...err.data };
      });
    return response;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
