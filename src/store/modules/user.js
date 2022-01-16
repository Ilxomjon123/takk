import axios from 'axios';

const state = () => {
  return {
    user: {},
    token: null
  };
};

const getters = {
  getUser: state => state.user,
  getToken: state => {
    if (state.token != null) {
      return state.token;
    } else {
      const token = localStorage.getItem('token');
      if (token != null) state.token = token;
    }
    return state.token;
  },
  getHttpHeader(state, getters) {
    return {
      Authorization: `Token ${getters.getToken}`
    };
  }
};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
    localStorage.setItem('token', payload);
  }
};
const actions = {
  async signin({ commit }, form) {
    try {
      let res = await axios.post('/api/users/register/', form);
      return {
        status: true,
        data: res.data
      };
    } catch (err) {
      return {
        status: false,
        data: err.response
      };
    }
  }
};

export default {
  namecpaced: true,
  state,
  getters,
  actions,
  mutations
};
