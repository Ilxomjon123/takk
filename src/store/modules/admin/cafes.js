import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();

const state = () => {
  return {
    adminCafeList: [],
    adminSquareCafeList: [],
    adminCafeById: {},
  };
};

// getters
const getters = {
  getAdminCafeList: (state) => state.adminCafeList,
  getAdminSquareCafeList: (state) => state.adminSquareCafeList,
  getAdminSquareCafeIDList: (state) =>
    state.squareCafeList?.map((item) => item.square_location_id),
  getAdminCafeById: (state) => state.adminCafeById,
  getAdminSquareSelectedCafeList: (state) =>
    state.cafeList?.filter((item) => item.square_location_id?.length > 0),
};

// mutations
const mutations = {
  setAdminCafeList(state, payload) {
    state.adminCafeList = payload;
  },
  setAdminSquareCafeList(state, payload) {
    state.adminSquareCafeList = payload;
  },
  setAdminCafeById(state, payload) {
    state.adminCafeById = payload;
  },
};

// actions
const actions = {
  async fetchAdminCafeList({ rootGetters, commit }) {
    try {
      const res = await axios.get('/adham/cafes/', {
        params: rootGetters['adminCompany/getAdminParameter'],
        headers: rootGetters.getHttpHeader,
      });
      commit('setAdminCafeList', res.data.results);
      return res.data;
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async fetchAdminSquareCafeList({ rootGetters, commit }) {
    try {
      const res = await axios.get('/adham/square/locations/parse/', {
        headers: rootGetters.getHttpHeader,
      });
      commit('setSquareCafeList', res.data);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async fetchAdminCafeById({ rootGetters, commit }, payload) {
    try {
      const res = await axios.get('/adham/cafes/' + payload + '/', {
        // params: { id: payload },
        headers: rootGetters.getHttpHeader,
      });

      commit('setAdminCafeById', res.data);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async storeAdminCafe({ rootGetters, commit }, payload) {
    const data = { ...payload, company: rootGetters.getUser.company_id };

    try {
      const res = await api({
        url: `/adham/cafes/`,
        method: 'post',
        data,
      });

      return res.data;
    } catch (err) {
      return console.log('error while saving cafe data: ', err);
    }
  },
  async storeAdminSquareCafe({ rootGetters, commit }, payload) {
    let response;
    await axios
      .post(
        `/adham/square/locations/import/`,
        { locations: payload },
        { headers: rootGetters.getHttpHeader }
      )
      .then((res) => {
        response = {
          status: true,
          data: res.data,
        };
      })
      .catch((err) => {
        response = {
          status: false,
          data: err.response,
        };
      });

    return response;
  },
  squareCafeNotification({ rootGetters }, payload) {
    axios.post(
      `/adham/cafes/square/notifications/`,
      { cafe: payload },
      { headers: rootGetters.getHttpHeader }
    );
  },
  async storeAdminSquareIDCafe({ rootGetters, commit, dispatch, getters }) {
    let response;
    await dispatch('fetchSquareCafeList');
    await axios
      .post(
        `/adham/square/locations/import/`,
        {
          locations: getters.getSquareCafeIDList,
        },
        {
          headers: rootGetters.getHttpHeader,
        }
      )
      .then((res) => {
        response = {
          status: true,
          data: res.data,
        };
      })
      .catch((err) => {
        response = {
          status: false,
          data: err.response,
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
