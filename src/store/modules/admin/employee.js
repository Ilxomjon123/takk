import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    adminEmployees: [],
    adminEmployee: {},
  };
};

const getters = {
  getAdminEmployees: (state) => state.adminEmployees,
  getAdminEmployee: (state) => state.adminEmployee,
};

const mutations = {
  setAdminEmployees(state, payload) {
    state.adminEmployees = payload;
  },
  setAdminEmployee(state, payload) {
    state.adminEmployee = payload;
  },
};

const actions = {
  async fetchAdminEmployees({ commit, rootGetters }, payload) {
    try {
      const { data } = await api({
        url: `https://api.takk.cafe/api/v1/dashboard/admin/employee/`,
        params: {
          ...payload,
          ...rootGetters['adminCompany/getAdminParameter'],
        },
      });

      commit('setAdminEmployees', data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async fetchAdminEmployee({ commit }, id) {
    try {
      const { data } = await api.get(
        `https://api.takk.cafe/api/v1/dashboard/admin/employee/${id}/`
      );
      commit('setAdminEmployee', data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async postAdminEmployeeNew({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/employee/new/`,
        payload,
        {
          headers: {
            ...rootGetters.getHttpHeader,
            // 'Content-Type': 'multipart/form-data'
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
          data: err.response.data,
        };
      });
    return response;
  },
  async postAdminEmployeeExist({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/employee/exists/`,
        payload,
        {
          headers: {
            ...rootGetters.getHttpHeader,
            // 'Content-Type': 'multipart/form-data'
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
          data: err.response.data,
        };
      });
    return response;
  },

  async putAdminEmployee({ commit }, payload) {
    try {
      const { data } = await api({
        url: `https://api.takk.cafe/api/v1/dashboard/admin/employee/${payload.id}/`,
        method: 'PUT',
        data: payload.form,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
  async deleteAdminEmployee({ rootGetters }, payload) {
    let response;
    await axios
      .delete(
        `https://api.takk.cafe/api/v1/dashboard/admin/employee/${payload}/`,
        {
          headers: {
            ...rootGetters.getHttpHeader,
            // 'Content-Type': 'multipart/form-data'
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
          data: err.response.data,
        };
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
