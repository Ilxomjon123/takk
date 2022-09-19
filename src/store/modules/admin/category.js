import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();
const state = () => {
  return {
    categories: [],
    category: {},
  };
};

const getters = {
  getCategories: (state) => state.categories,
  getCategory: (state) => state.category,
};

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  setCategory(state, payload) {
    state.category = payload;
  },
};

const actions = {
  async fetchCategories({ commit, rootGetters }, payload) {
    try {
      const res = await api.get(
        `https://api.takk.cafe/api/v1/dashboard/admin/menus/${rootGetters.getSelectedMenuId}/categories/`,
        { params: payload }
      );

      commit('setCategories', res?.data?.results);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchCategory({ commit, rootGetters }, payload) {
    let response;
    await axios
      .get(
        `https://api.takk.cafe/api/v1/dashboard/admin/categories/${payload}/`,
        {
          // .get(`https://api.takk.cafe/api/v1/dashboard/admin/transactions/`, {
          headers: rootGetters.getHttpHeader,
        }
      )
      .then((res) => {
        response = res.data;
        commit('setCategory', res?.data);
      })
      .catch((err) => {
        response = err.data;
        // commit('setTransactions', err.response.data);
      });
    return response;
  },
  async postCategory({ rootGetters }, payload) {
    let response;
    await axios
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/categories/`,
        payload,
        {
          headers: {
            ...rootGetters.getHttpHeader,
            'Conten-type': 'multipart/form-data',
          },
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
  async putCategory({ rootGetters }, payload) {
    let response;
    await axios
      .put(
        `https://api.takk.cafe/api/v1/dashboard/admin/categories/${payload.id}/`,
        payload.form,
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
  async deleteCategory({ rootGetters }, payload) {
    let response;
    await axios
      .delete(
        `https://api.takk.cafe/api/v1/dashboard/admin/categories/${payload}/`,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
