import axios from 'axios';
import makeRequest from '@/api/admin/makeRequest';
import { isNull } from 'lodash';
import { useStorage } from '@vueuse/core';
import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    menus: [],
    selectedMenuId: useStorage('selected-productmenu-id', null),
  };
};

const getters = {
  getMenus: (state) => state.menus,
  getSelectedMenuId: (state) => state.selectedMenuId,
  // state.selectedMenuId || localStorage.getItem('selected-productmenu-id')
};

const mutations = {
  setMenus(state, payload) {
    state.menus = payload;
  },
  setSelectedMenuId(state, payload) {
    // if (isNull(payload)) localStorage.removeItem('selected-productmenu-id');
    // else {
    //   localStorage.setItem('selected-productmenu-id', payload);
    //   state.selectedMenuId = payload;
    // }
    state.selectedMenuId = payload;
  },
};

const actions = {
  async fetchMenus({ commit }, payload) {
    try {
      const { data } = await api({
        url: `/adham/menus/`,
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
        `/adham/menus/`,
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
        `/adham/menus/${payload.id}/`,
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
    if (payload === state.selectedMenuId) commit('setSelectedMenuId', null);
    try {
      const res = await api({
        url: `/adham/menus/${payload}/`,
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
        url: '/adham/menus/ordering-items/',
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
