import axios from 'axios';

const state = () => {
  return {
    categories: []
  };
};

const getters = {
  getCategories: state => state.categories
};

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  }
};

const actions = {
  async fetchCategories({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/menus/${rootGetters.getSelectedMenuId}/categories/`, {
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
  async postCategory({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `/api/menus/`,
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
  async putCategory({ rootGetters }, payload) {
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
  async deleteCategory({ rootGetters }, payload) {
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
