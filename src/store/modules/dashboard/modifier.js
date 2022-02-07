import axios from 'axios';

const state = () => {
  return {
    modifiers: []
  };
};

const getters = {
  getModifiers: state => state.modifiers
};

const mutations = {
  setModifiers(state, payload) {
    state.modifiers = payload;
  }
};

const actions = {
  async fetchModifiers({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/menus/${rootGetters.getSelectedMenuId}/modifiers/`, {
        // .get(`/api/transactions/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setMenus', res.data);
      })
      .catch(err => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async postModifier({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `/api/modifiers/`,
        { ...payload, company: rootGetters.getCompanyId },
        {
          headers: {
            ...rootGetters.getHttpHeader,
            'Conten-type': 'multipart/form-data'
          }
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
        `/api/modifiers/${payload.id}/`,
        { ...payload, company: rootGetters.getCompanyId },
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
      .delete(`/api/modifiers/${payload}/`, {
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
