import makeRequest from '@/api/makeRequest.js';
import axios from 'axios';

const state = () => {
  return {
    cafeList: [],
    squareCafeList: [],
    cafeById: {}
  };
};

// getters
const getters = {
  getCafeList: state => state.cafeList,
  getSquareCafeList: state => state.squareCafeList,
  getSquareCafeIDList: state =>
    state.squareCafeList.map(item => item.square_location_id),
  getCafeById: state => state.cafeById,
  getSquareSelectedCafeList: state =>
    state.cafeList.filter(item => item.square_location_id?.length > 0)
};

// mutations
const mutations = {
  setCafeList(state, payload) {
    state.cafeList = payload;
  },
  setSquareCafeList(state, payload) {
    state.squareCafeList = payload;
  },
  setCafeById(state, payload) {
    state.cafeById = payload;
  }
};

// actions
const actions = {
  async fetchCafeList({ rootGetters, commit }) {
    try {
      const res = await axios.get('/api/cafes/', {
        // params: { id: rootGetters.getUser.company_id },
        headers: rootGetters.getHttpHeader
      });

      commit('setCafeList', res.data.results);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async fetchSquareCafeList({ rootGetters, commit }) {
    try {
      const res = await axios.get('/api/square/locations/parse/', {
        headers: rootGetters.getHttpHeader
      });
      commit('setSquareCafeList', res.data);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async fetchCafeById({ rootGetters, commit }, payload) {
    try {
      const res = await axios.get('/api/cafes/' + payload + '/', {
        // params: { id: payload },
        headers: rootGetters.getHttpHeader
      });

      commit('setCafeById', res.data);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async storeCafe({ rootGetters, commit }, payload) {
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
  },
  async storeSquareCafe({ rootGetters, commit }, payload) {
    let response;
    await axios
      .post(
        `/api/square/locations/import/`,
        { locations: payload },
        { headers: rootGetters.getHttpHeader }
      )
      .then(res => {
        response = {
          status: true,
          data: res.data
        };
      })
      .catch(err => {
        response = {
          status: false,
          data: err.response
        };
      });

    return response;
  },
  squareCafeNotification({ rootGetters }, payload) {
    axios.post(
      `/api/cafes/square/notifications/`,
      { cafe: payload },
      { headers: rootGetters.getHttpHeader }
    );
  },
  async storeSquareIDCafe({ rootGetters, commit, dispatch, getters }) {
    let response;
    await dispatch('fetchSquareCafeList');
    await axios
      .post(
        `/api/square/locations/import/`,
        {
          locations: getters.getSquareCafeIDList
        },
        {
          headers: rootGetters.getHttpHeader
        }
      )
      .then(res => {
        response = {
          status: true,
          data: res.data
        };
      })
      .catch(err => {
        response = {
          status: false,
          data: err.response
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
