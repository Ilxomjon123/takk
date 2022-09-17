import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();
const state = () => {
  return {
    modifierTypes: [],
    selectedModifierTypeId: null,
    modifiers: [],
  };
};

const getters = {
  getModifiers: (state) => state.modifiers,
  getModifierTypes: (state) => state.modifierTypes,
  getSelectedModifierTypeId: (state) => state.selectedModifierTypeId,
};

const mutations = {
  setModifiers(state, payload) {
    state.modifiers = payload;
  },
  setModifierTypes(state, payload) {
    state.modifierTypes = payload;
  },
  setSelectedModifierTypeId(state, payload) {
    state.selectedModifierTypeId = payload;
  },
};

const actions = {
  async fetchModifierTypes({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/menus/${rootGetters.getSelectedMenuId}/modifiers/`,
        {
          // .get(`https://api.takk.cafe/api/v1/dashboard/admin/transactions/`, {
          headers: rootGetters.getHttpHeader,
          params: payload,
        }
      )
      .then((res) => {
        response = res.data;
        commit('setModifierTypes', res.data);
      })
      .catch((err) => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async postModifierType({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/modifiers/`,
        { ...payload, menu: rootGetters.getSelectedMenuId },
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
  async putModifierType({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `https://api.takk.cafe/api/v1/dashboard/admin/modifiers/${payload.id}/`,
        { ...payload, menu: rootGetters.getSelectedMenuId },
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
  async deleteModifierType(ctx, payload) {
    try {
      const res = await api.delete(`/adham/modifiers/${payload}/`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async postModifier({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/modifiers/items/`,
        { ...payload /*  modifier: rootGetters.getSelectedModifierTypeId */ },
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
  async putModifier({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `https://api.takk.cafe/api/v1/dashboard/admin/modifiers/items/${payload.id}/`,
        { ...payload /*  modifier: rootGetters.getSelectedModifierTypeId  */ },
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
  async deleteModifier(ctx, payload) {
    try {
      const res = await api.delete(`/adham/modifiers/items/${payload}/`);
      return res.data;
    } catch (error) {
      throw error;
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
