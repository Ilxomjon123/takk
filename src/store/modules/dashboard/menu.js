import axios from 'axios';
import makeRequest from '@/api/makeRequest';
import { useStorage } from '@vueuse/core';
import { useApi } from '@/composables/useApi';

const api = useApi();
const state = () => {
  return {
    menus: [],
    // selectedMenuId: null,
    selectedMenuID: useStorage('selected-productmenu-id', null),
  };
};

const getters = {
  getMenus: (state) => state.menus,
  getSelectedMenuId: (state) => state.selectedMenuID,
};

const mutations = {
  setMenus(state, payload) {
    state.menus = payload;
  },
  setSelectedMenuId(state, payload) {
    state.selectedMenuID = payload;
  },
};

const actions = {
  async fetchMenus({ commit, rootGetters }) {
    let response;
    await axios
      .get(`/api/menus/`, {
        headers: rootGetters.getHttpHeader,
      })
      .then((res) => {
        response = res.data;
        commit('setMenus', res.data);
      })
      .catch((err) => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },

  async postMenu({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `/api/menus/`,
        { ...payload, company: rootGetters.getCompanyId },
        {
          headers: rootGetters.getHttpHeader,
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

  async putMenu({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `/api/menus/${payload.id}/`,
        { ...payload, company: rootGetters.getCompanyId },
        {
          headers: rootGetters.getHttpHeader,
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

  async deleteMenu({ state, commit }, payload) {
    if (payload === state.selectedMenuID) commit('setSelectedMenuId', null);
    try {
      const res = await api({
        url: `/api/menus/${payload}/`,
        method: 'DELETE',
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async updateModifierTypePositions({ rootGetters }, payload) {
    try {
      const res = makeRequest({
        url: '/api/menus/ordering-items/',
        method: 'post',
        data: payload,
        headers: { authorization: true },
      });
      return (await res).data;
    } catch (error) {
      console.log('error while updating Product: ', err);
      throw err;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
