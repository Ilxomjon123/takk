import axios from 'axios';

const state = () => {
  return {
    modifierTypes: [],
    selectedModifierTypeId: null,
    modifiers: []
  };
};

const getters = {
  getModifiers: state => state.modifiers,
  getModifierTypes: state => state.modifierTypes,
  getSelectedModifierTypeId: state => state.selectedModifierTypeId
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
  }
};

const actions = {
  async fetchModifierTypes({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/menus/${rootGetters.getSelectedMenuId}/modifiers/`, {
        // .get(`/adham/transactions/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setModifierTypes', res.data);
      })
      .catch(err => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async postModifierType({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `/adham/modifiers/`,
        { ...payload, menu: rootGetters.getSelectedMenuId },
        {
          headers: rootGetters.getHttpHeader
        }
      )
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
  async putModifierType({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `/adham/modifiers/${payload.id}/`,
        { ...payload, menu: rootGetters.getSelectedMenuId },
        {
          headers: rootGetters.getHttpHeader
        }
      )
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
  async deleteModifierType({ rootGetters }, payload) {
    let response;
    await axios
      .delete(`/adham/modifiers/${payload}/`, {
        headers: rootGetters.getHttpHeader
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
  async postModifier({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `/adham/modifiers/items/`,
        { ...payload /*  modifier: rootGetters.getSelectedModifierTypeId */ },
        {
          headers: rootGetters.getHttpHeader
        }
      )
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
  async putModifier({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `/adham/modifiers/items/${payload.id}/`,
        { ...payload /*  modifier: rootGetters.getSelectedModifierTypeId  */ },
        {
          headers: rootGetters.getHttpHeader
        }
      )
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
  async deleteModifier({ rootGetters }, payload) {
    let response;
    await axios
      .delete(`/adham/modifiers/items/${payload}/`, {
        headers: rootGetters.getHttpHeader
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
