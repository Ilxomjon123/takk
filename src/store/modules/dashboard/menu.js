import axios from 'axios';

const state = () => {
  return {
    menus: [],
    selectedMenuId: null
  };
};

const getters = {
  getMenus: state => state.menus,
  getSelectedMenuId: state => state.selectedMenuId
};

const mutations = {
  setMenus(state, payload) {
    state.menus = payload;
  },
  setSelectedMenuId(state, payload) {
    state.selectedMenuId = payload;
  }
};

const actions = {
  async fetchMenus({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/companies/${rootGetters.getCompanyId}/menus/`, {
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
  async postMenu({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `/api/menus/`,
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
  async putMenu({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `/api/menus/${payload.id}/`,
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
  async deleteMenu({ rootGetters }, payload) {
    let response;
    await axios
      .delete(`/api/menus/${payload}/`, {
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
