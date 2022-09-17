import axios from 'axios';
import { useApi } from '@/composables/useApi';

const api = useApi();
// api.defaults.baseURL = 'https://api.takk.cafe/api/v1/dashboard/admin';

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
      const res = await api.get(
        'https://api.takk.cafe/api/v1/dashboard/admin/cafes/',
        {
          params: rootGetters['adminCompany/getAdminParameter'],
        }
      );
      commit('setAdminCafeList', res.data.results);
      return res.data;
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async fetchAdminSquareCafeList({ commit }) {
    try {
      const res = await api.get(
        'https://api.takk.cafe/api/v1/dashboard/admin/square/locations/parse/'
      );
      commit('setSquareCafeList', res.data);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async fetchAdminCafeById({ commit }, payload) {
    try {
      const res = await api.get(
        'https://api.takk.cafe/api/v1/dashboard/admin/cafes/' + payload + '/'
      );

      commit('setAdminCafeById', res.data);
    } catch (err) {
      return console.log('error while fetching cafes: ', err);
    }
  },

  async storeAdminCafe({ rootGetters }, payload) {
    const data = { ...payload, company: rootGetters.getUser.company_id };

    try {
      const res = await api({
        url: `https://api.takk.cafe/api/v1/dashboard/admin/cafes/`,
        method: 'post',
        data,
      });

      return res.data;
    } catch (err) {
      return console.log('error while saving cafe data: ', err);
    }
  },
  async storeAdminSquareCafe(ctx, payload) {
    let response;
    await api
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/square/locations/import/`,
        { locations: payload }
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
  async squareCafeNotification(ctx, payload) {
    await api.post(
      `https://api.takk.cafe/api/v1/dashboard/admin/cafes/square/notifications/`,
      { cafe: payload }
    );
  },
  async storeAdminSquareIDCafe({ dispatch, getters }) {
    let response;
    await dispatch('fetchSquareCafeList');
    await api
      .post(
        `https://api.takk.cafe/api/v1/dashboard/admin/square/locations/import/`,
        {
          locations: getters.getSquareCafeIDList,
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
