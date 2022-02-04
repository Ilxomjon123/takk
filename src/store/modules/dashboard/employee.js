import axios from 'axios';

const state = () => {
  return {
    employees: [],
    employee: {}
  };
};

const getters = {
  getEmployees: state => state.employees,
  getEmployee: state => state.employee
};

const mutations = {
  setEmployees(state, payload) {
    state.employees = payload;
  },
  setEmployee(state, payload) {
    state.employee = payload;
  }
};

const actions = {
  async fetchEmployees({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/employees/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setEmployees', res.data);
      })
      .catch(err => {
        response = res.data;
        // commit('setEmployees', err.response.data);
      });
    return response;
  },
  async fetchEmployee({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/employees/${payload}/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setEmployee', res.data);
      })
      .catch(err => {
        response = res.data;
        // commit('setEmployees', err.response.data);
      });
    return response;
  },
  async postEmployeeNew({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/api/employees/new/`, payload, {
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
  async postEmployeeExist({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/api/employees/exists/`, payload, {
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
  async putEmployee({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/api/employees/${payload.id}/`, payload, {
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
  async deleteEmployee({ rootGetters }, payload) {
    let response;
    await axios
      .delete(`/api/employees/${payload}/`, {
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
  state,
  getters,
  actions,
  mutations
};
