import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    company: {},
    customers: [],
    statisticCustomers: [],
    statisticProducts: [],
    transactions: []
  };
};

const getters = {
  getCompany: state => state.company,
  getCustomers: state => state.customers,
  getTransactions: state => state.transactions,
  getStatisticCustomers: state => state.statisticCustomers,
  getStatisticProducts: state => state.statisticProducts
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
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

  async putCompany({ commit }, payload) {
    // let response;
    // await axios
    //   .put(`/api/companies/`, payload.form, {
    //     headers: {
    //       ...rootGetters.getHttpHeader,
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   .then(async res => {
    //     response = {
    //       status: true,
    //       data: res.data
    //     };
    //   })
    //   .catch(err => {
    //     response = {
    //       status: false,
    //       data: err.response?.data
    //     };
    //   });
    // return response;

    try {
      const res = await api({
        url: `/api/companies/`,
        method: 'PUT',
        data: payload.form
      });

      commit('setCompany', res.data);
    } catch (error) {
      throw error;
    }
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
  async fetchStripeConnect({ commit, rootGetters }) {
    let response;
    await axios
      // .get(`/api/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`/api/stripe/connect/`, {
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
  async fetchStatisticsSalesYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/sales/year/`, {
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
  async fetchStatisticsSalesWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/sales/week/`, {
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
  async fetchStatisticsTransactionYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/transaction/year/`, {
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
  async fetchStatisticsTransactionWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/transaction/week/`, {
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
  async fetchStatisticsRegistrationYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/user-register/year/`, {
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
  async fetchStatisticsRegistrationWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/user-register/week/`, {
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
  async fetchStatisticsCustomer({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/customers/`, {
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
  async fetchStatisticsProducts({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/statistics/products/`, {
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
  state,
  getters,
  actions,
  mutations
};
