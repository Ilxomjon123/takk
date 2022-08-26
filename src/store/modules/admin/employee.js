import axios from 'axios';

const state = () => {
  return {
    adminEmployees: [],
    adminEmployee: {}
  };
};

const getters = {
  getAdminEmployees: state => state.adminEmployees,
  getAdminEmployee: state => state.adminEmployee
};

const mutations = {
  setAdminEmployees(state, payload) {
    state.adminEmployees = payload;
  },
  setAdminEmployee(state, payload) {
    state.adminEmployee = payload;
  }
};

const actions = {
  async fetchAdminEmployees({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/employee/`, {
        headers: rootGetters.getHttpHeader,
        params: { ...payload, ...rootGetters['adminCompany/getAdminParameter'] }
      })
      .then(res => {
        response = res.data;
        commit('setAdminEmployees', res.data);
      })
      .catch(err => {
        response = res.data;
        // commit('setAdminEmployees', err.response.data);
      });
    return response;
  },
  async fetchAdminEmployee({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/employee/${payload}/`, {
        headers: rootGetters.getHttpHeader
        // params: payload
      })
      .then(res => {
        response = res.data;
        commit('setAdminEmployee', res.data);
      })
      .catch(err => {
        response = res.data;
        // commit('setAdminEmployees', err.response.data);
      });
    return response;
  },
  async postAdminEmployeeNew({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/adham/employees/new/`, payload, {
        headers: {
          ...rootGetters.getHttpHeader
          // 'Content-Type': 'multipart/form-data'
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
  async postAdminEmployeeExist({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/adham/employees/exists/`, payload, {
        headers: {
          ...rootGetters.getHttpHeader
          // 'Content-Type': 'multipart/form-data'
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
  async putAdminEmployee({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/adham/employees/${payload.id}/`, payload.form, {
        headers: {
          ...rootGetters.getHttpHeader
          // 'Content-Type': 'multipart/form-data'
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
  async deleteAdminEmployee({ rootGetters }, payload) {
    let response;
    await axios
      .delete(`/adham/employees/${payload}/`, {
        headers: {
          ...rootGetters.getHttpHeader
          // 'Content-Type': 'multipart/form-data'
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
  }
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
};
