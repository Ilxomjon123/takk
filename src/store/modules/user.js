import axios from 'axios';
import { useApi } from '@/composables/useApi';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';

const REQUIRED_DETAILS = 'required_details';

const api = useApi();

const state = () => {
  return {
    // refreshToken: JSON.parse(localStorage.getItem(REQUIRED_DETAILS))?.token
    //   ?.refresh,
    // token: JSON.parse(localStorage.getItem(REQUIRED_DETAILS))?.token?.access,
    token: useStorage('token', ''),
    refreshToken: useStorage('refresh', ''),
    // user: JSON.parse(localStorage.getItem(REQUIRED_DETAILS))?.user,
    // user: useStorage('user', null),
    user: reactive({}),
    requiredDetails: useStorage(REQUIRED_DETAILS, null),
    // STEP_ENTRY: null,
    STEP_COMPANY: 1,
    STEP_CAFE: 2,
    // STEP_MENU: 3,
    STEP_FINISH: 3,
    STEP_DASHBOARD: 4,
    employee_types: [
      { name: 'Manager', value: 1 },
      { name: 'Casher', value: 2 }
    ]
  };
};

const getters = {
  getUser: state => state.user,
  isSuperuser: state => state.user.is_superuser,
  getCompanyId: state => state.user.company_id,
  getToken: state => state.token,
  getRefreshToken: state => state.refreshToken,
  getHttpHeader(state, getters) {
    return {
      Authorization: `JWT ${getters.getToken}`
    };
  },
  getStep(state, getters) {
    return state.user?.state_steps;
    // return getters.getUser.state_steps;
  },
  getEmployeeTypes: state => state.employee_types,
  isLoggedIn: state => state.token !== undefined && state.token !== ''
};

const mutations = {
  setUser(state, payload) {
    // let details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
    // details.user = payload;
    // localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(details));
    Object.assign(state.user, payload);
    // state.user = payload
  },
  setToken(state, payload) {
    state.token = payload.access;
    state.refreshToken = payload.refresh;
  },
  setRequiredDetails(state, payload) {
    // state.token = payload;
    // localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(payload));
    state.requiredDetails = payload;
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
  }
};

const actions = {
  async signin({ dispatch }, form) {
    try {
      const res = await api({
        url: '/api/users/register/',
        method: 'POST',
        data: form
      });
      dispatch('postFcm');
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async putStep({ commit, rootGetters }, payload) {
    // console.log(payload);
    try {
      let res = await axios.put(
        '/api/steps/',
        {
          state_steps: payload
        },
        {
          headers: rootGetters.getHttpHeader
        }
      );
      commit('setStep', payload);
      return {
        status: true,
        data: res.data
      };
    } catch (err) {
      return {
        status: false,
        data: err.response
      };
    }
  },
  async logout({ state, dispatch }) {
    // localStorage.clear();
    // localStorage.removeItem('required_details');
    await dispatch('deleteFcm');
    state.token = '';
    localStorage.removeItem('selected-productmenu-id');
  },
  async fetchProfile({ commit }) {
    try {
      const { data } = await api({
        url: '/api/users/profile/'
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
        data: payload
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
        data: { type: 'web', registration_id: getters.getToken }
      });
    } catch (error) {
      throw error;
    }
  },
  async deleteFcm({ commit }) {
    try {
      const res = await api({
        url: `/api/fcm-notofications/`,
        method: 'DELETE'
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
        data: { refresh: getters.getRefreshToken }
      });

      commit('setToken', data);
    } catch (error) {
      throw error;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
