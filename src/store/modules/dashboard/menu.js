import axios from 'axios';
import { useStorage } from '@vueuse/core';
import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    menus: [],
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
  async fetchMenus({ commit }, payload) {
    try {
      const { data } = await api({
        url: `/api/menus/`,
        params: payload,
      });
      commit('setMenus', data);

      return data;
    } catch (error) {
      throw error;
    }
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
      const res = api({
        url: '/api/menus/ordering-items/',
        method: 'POST',
        data: payload,
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
