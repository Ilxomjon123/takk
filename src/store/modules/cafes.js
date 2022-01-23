import makeRequest from '@/api/makeRequest.js';
import axios from 'axios';

const state = () => {
  return {
    cafeList: [],
    oneCafe: null
  };
};

// getters
const getters = {
  getCafeList: state => state.cafeList,
  getOneCafe: state => state.oneCafe
};

// mutations
const mutations = {
  setCafeList(state, payload) {
    state.cafeList = payload;
  },
  setOneCafe(state, payload) {
    state.oneCafe = payload;
  }
};

// actions
const actions = {
  async fetchCafeList({ rootGetters, commit }) {
    try {
      const res = await axios.get('/api/companies/', {
        params: { id: rootGetters.getUser.company_id },
        headers: rootGetters.getHttpHeader
      });

      commit('setCafeList', res.data[0].cafes);
      return res.data[0].cafes;
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async cafePost({ rootGetters, commit }, payload) {
    const data = { ...payload, company: rootGetters.getUser.company_id };

    try {
      const res = await makeRequest({
        url: `/api/cafes/`,
        method: 'post',
        data,
        headers: { authorization: true }
      });

      return res.data;
    } catch (err) {
      return console.log('error while saving cafe data: ', err);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
