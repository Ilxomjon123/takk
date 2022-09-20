import axios from 'axios';
import { useStorage } from '@vueuse/core';
import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    company: {},
    selectedCompanyID: useStorage('selected-company-id', 0),
    companies: [],
    customers: [],
    statisticCustomers: [],
    statisticProducts: [],
    transactions: [],
  };
};

const getters = {
  getAdminCompany: (state) => state.company,
  getAdminSelectedCompanyID: (state) =>
    state.selectedCompanyID == 0 ? null : state.selectedCompanyID,
  getAdminCompanies: (state) => state.companies,
  getAdminCustomers: (state) => state.customers,
  getAdminTransactions: (state) => state.transactions,
  getAdminStatisticCustomers: (state) => state.statisticCustomers,
  getAdminStatisticProducts: (state) => state.statisticProducts,
  getAdminParameter: (state) => {
    let result = {};
    if (state.selectedCompanyID != 0) {
      result = { company: state.selectedCompanyID };
    }
    return result;
  },
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  },
  setSelectedCompanyID(state, payload) {
    state.selectedCompanyID = payload;
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
  },
};

const actions = {
  async fetchAdminCompanies({ commit, rootGetters }) {
    await axios
      .get('https://api.takk.cafe/api/v1/dashboard/admin/companies/', {
        headers: rootGetters.getHttpHeader,
      })
      .then((res) => {
        commit('setCompanies', res.data.results);
      })
      .catch((err) => {
        commit('setCompanies', err.response.data);
      });
  },

  async fetchAdminCompany({ commit, rootGetters }) {
    await axios
      .get('https://api.takk.cafe/api/v1/dashboard/admin/companies/', {
        headers: rootGetters.getHttpHeader,
        params: {
          id: rootGetters.getCompanyId,
        },
      })
      .then((res) => {
        commit('setCompany', res.data);
        // commit('cafes/setCafeList', res.data.cafes, { root: true });
      })
      .catch((err) => {
        commit('setCompany', err.response.data);
      });
  },

  async putCompany({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `https://api.takk.cafe/api/v1/dashboard/admin/companies/${payload.id}/`,
        payload.form,
        {
          headers: {
            ...rootGetters.getHttpHeader,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(async (res) => {
        response = {
          status: true,
          data: res.data,
        };
      })
      .catch((err) => {
        response = {
          status: false,
          data: err.response?.data,
        };
      });
    return response;
  },

  async fetchAdminCustomers({ commit, rootGetters }, payload) {
    let response;
    await axios
      // .get(`https://api.takk.cafe/api/v1/dashboard/admin/companies/${rootGetters.getCompanyId}/customers/`, {
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/companies/customers/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
          },
        }
      )
      .then((res) => {
        response = res.data;
        commit('setCustomers', res.data);
      })
      .catch((err) => {
        throw err;
      });
    return response;
  },

  async fetchAdminTransactions({ commit, getters }, payload) {
    try {
      const { data } = await api.get(
        `https://api.takk.cafe/api/v1/dashboard/admin/transactions/`,
        {
          params: {
            ...payload,
            company: getters['getAdminSelectedCompanyID'],
          },
        }
      );

      commit('setTransactions', data);

      return data;
    } catch (error) {
      throw error;
    }
  },
  async fetchAdminStripeConnect({ commit, rootGetters }) {
    let response;
    await axios
      // .get(`https://api.takk.cafe/api/v1/dashboard/admin/companies/${rootGetters.getCompanyId}/transactions/`, {
      .get(`https://api.takk.cafe/api/v1/dashboard/admin/stripe/connect/`, {
        headers: rootGetters.getHttpHeader,
      })
      .then((res) => {
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
        // commit('setTransactions', err.response.data);
      });
    return response;
  },

  async fetchAdminStatisticsSalesYear({ getters }, payload) {
    try {
      const { data } = await api.get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/sales/year/`,
        {
          params: {
            ...payload,
            company: getters['getAdminSelectedCompanyID'],
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  async fetchAdminStatisticsSalesWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/sales/week/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
          },
        }
      )
      .then((res) => {
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsTransactionYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/transaction/year/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
          },
        }
      )
      .then((res) => {
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsTransactionWeek({ commit, rootGetters }, payload) {
    let response;

    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/transaction/week/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
          },
        }
      )
      .then((res) => {
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsRegistrationYear({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/user-register/year/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
          },
        }
      )
      .then((res) => {
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsRegistrationWeek({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/user-register/week/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
          },
        }
      )
      .then((res) => {
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsCustomer({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/customers/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
            limit: 10,
          },
        }
      )
      .then((res) => {
        commit('setStatisticCustomers', res.data.results);
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
  async fetchAdminStatisticsProducts({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/statistics/products/`,
        {
          headers: rootGetters.getHttpHeader,
          params: {
            ...payload,
            ...rootGetters['adminCompany/getAdminParameter'],
            limit: 10,
          },
        }
      )
      .then((res) => {
        commit('setStatisticProducts', res.data.results);
        response = { status: true, ...res.data };
      })
      .catch((err) => {
        response = { status: false, ...err.data };
      });
    return response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
