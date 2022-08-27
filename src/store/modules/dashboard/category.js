import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();

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
    try {
      const res = await api({
        url: `/api/menus/${rootGetters.getSelectedMenuId}/categories/`,
        params: payload
      });

      commit('setCategories', res.data.results);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchCategory({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(`/api/categories/${payload}/`, {
        // .get(`/api/transactions/`, {
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
    try {
      const res = await api({
        url: '/api/categories/',
        method: 'POST',
        data: payload
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async putCategory({ rootGetters }, payload) {
    let response;
    await axios
      .put(`/api/categories/${payload.id}/`, payload.form, {
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
      .delete(`/api/categories/${payload}/`, {
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
