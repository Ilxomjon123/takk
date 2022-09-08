import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    employees: [],
    employee: {},
  };
};

const getters = {
  getEmployees: (state) => state.employees,
  getEmployee: (state) => state.employee,
};

const mutations = {
  setEmployees(state, payload) {
    state.employees = payload;
  },
  setEmployee(state, payload) {
    state.employee = payload;
  },
};

const actions = {
  async fetchEmployees({ commit }, payload) {
    try {
      const { data } = await api({
        url: '/api/employees/',
        params: payload,
      });

      commit('setEmployees', data);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async fetchEmployee({ commit }, payload) {
    try {
      const { data } = await api({
        url: `/api/employees/${payload}/`,
        params: payload,
      });
      commit('setEmployee', data);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async postEmployeeNew(payload) {
    try {
      const { data } = await api({
        url: '/api/employees/new/',
        method: 'POST',
        data: payload,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async postEmployeeExist({ commit }, payload) {
    try {
      const { data } = await api({
        url: '/api/employees/exists/',
        method: 'POST',
        data: payload,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async putEmployee(payload) {
    try {
      const { data } = await api({
        url: `/api/employees/${payload.id}/`,
        method: 'PUT',
        data: payload.form,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async deleteEmployee(payload) {
    try {
      const { data } = await api({
        url: `/api/employees/${payload}/`,
        method: 'DELETE',
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
