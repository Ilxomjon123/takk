import axios from 'axios';

const state = () => {
  return {
    categories: [],
    category: {}
  };
};

const getters = {
  getCategories: state => state.categories,
  getCategory: state => state.category
};

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  setCategory(state, payload) {
    state.category = payload;
  }
};

const actions = {
  async fetchCategories({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/menus/${rootGetters.getSelectedMenuId}/categories/`, {
        // .get(`/adham/transactions/`, {
        headers: rootGetters.getHttpHeader,
        params: payload
      })
      .then(res => {
        response = res.data;
        commit('setCategories', res?.data?.results);
      })
      .catch(err => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async fetchCategory({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/adham/categories/${payload}/`, {
        // .get(`/adham/transactions/`, {
        headers: rootGetters.getHttpHeader
      })
      .then(res => {
        response = res.data;
        commit('setCategory', res?.data);
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
      .post(`/adham/categories/`, payload, {
        headers: {
          ...rootGetters.getHttpHeader,
          'Conten-type': 'multipart/form-data'
        }
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
  async putCategory({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/adham/categories/${payload.id}/`, payload.form, {
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
  async deleteCategory({ rootGetters }, payload) {
    let response;
    await axios
      .delete(`/adham/categories/${payload}/`, {
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
