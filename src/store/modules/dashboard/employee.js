import axios from 'axios';

const state = () => {
  return {
    employees: []
  };
};

const getters = {
  getEmployees: state => state.employees
};

const mutations = {
  setEmployees(state, payload) {
    state.employees = payload;
  }
};

const actions = {
  async fetchEmployees({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/employees/list/${rootGetters.getCompanyId}/`, {
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
  async postEmployee({ rootGetters }, payload) {
    let response;
    await axios
      .post(`/api/employees/`, payload, {
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
