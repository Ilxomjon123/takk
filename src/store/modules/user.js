import axios from 'axios';
import { useApi } from '@/composables/useApi';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';

const REQUIRED_DETAILS = 'required_details';

const api = useApi();

const state = () => {
  return {
    token: useStorage('token', ''),
    refreshToken: useStorage('refresh', ''),
    user: reactive({}),
    requiredDetails: useStorage(REQUIRED_DETAILS, null),
    STEP_COMPANY: 1,
    STEP_CAFE: 2,
    STEP_FINISH: 3,
    STEP_DASHBOARD: 4,
    employee_types: [
      { name: 'Manager', value: 1 },
      { name: 'Casher', value: 2 },
    ],
  };
};

const getters = {
  getUser: (state) => state.user,
  isSuperuser: (state) => state.user.is_superuser,
  getCompanyId: (state) => state.user.company_id,
  getToken: (state) => state.token,
  getRefreshToken: (state) => state.refreshToken,
  getHttpHeader(state, getters) {
    return {
      Authorization: `JWT ${getters.getToken}`,
    };
  },
  getStep(state, getters) {
    return state.user?.state_steps;
    // return getters.getUser.state_steps;
  },
  getEmployeeTypes: (state) => state.employee_types,
  isLoggedIn: (state) => state.token !== undefined && state.token !== '',
};

const mutations = {
  setUser(state, payload) {
    Object.assign(state.user, payload);
  },
  setToken(state, payload) {
    state.token = payload.access;
    state.refreshToken = payload.refresh;
  },
  setStep(state, payload) {
    let required_details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
    required_details.user.state_steps = payload;
    localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(required_details));
  },
  setCompanyId(state, payload) {
    let required_details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
    required_details.user.company_id = payload;
    localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(required_details));
  },
};

const actions = {
  async signin({ dispatch }, form) {
    try {
      const res = await api({
        url: '/api/users/register/',
        method: 'POST',
        data: form,
      });
      dispatch('postFcm');
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async putStep({ commit }, payload) {
    // console.log(payload);
    try {
      let res = await api.put('/api/steps/', { state_steps: payload });
      commit('setStep', payload);

      return {
        status: true,
        data: res.data,
      };
    } catch (err) {
      return {
        status: false,
        data: err.response,
      };
    }
  },

  async logout({ state, dispatch }) {
    // 100- va 101-qatorlarni o'chirib yubormang!!!
    // await dispatch('deleteFcm');
    state.token = '';
    state.refreshToken = '';
    localStorage.removeItem('selected-company-id');
    localStorage.removeItem('selected-productmenu-id');
  },

  async fetchProfile({ commit }) {
    try {
      const { data } = await api({
        url: '/api/users/profile/',
      });

      commit('setUser', data);
    } catch (error) {
      throw error;
    }
  },

  async putProfile({ commit }, payload) {
    try {
      const res = await api({
        url: `/api/users/profile/`,
        method: 'PUT',
        data: payload,
      });

      commit('setUser', res.data);
    } catch (error) {
      throw error;
    }
  },

  async postFcm({ getters }) {
    try {
      const res = await api({
        url: `/api/fcm-notofications/`,
        method: 'POST',
        data: { type: 'web', registration_id: getters.getToken },
      });
    } catch (error) {
      throw error;
    }
  },

  async deleteFcm({ commit }) {
    try {
      const res = await api({
        url: `/api/fcm-notofications/`,
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  },

  async refreshToken({ commit, getters }) {
    try {
      const { data } = await api({
        url: `/api/token/refresh/`,
        method: 'POST',
        data: { refresh: getters.getRefreshToken },
      });

      commit('setToken', data);
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
