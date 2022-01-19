import axios from 'axios';

const state = () => {
  return {
    user: {},
    token: null,
    STEP_ENTRY: null,
    STEP_COMPANY: 1,
    STEP_CAFE: 2,
    STEP_MENU: 3,
    STEP_DASHBOARD: 4
  };
};

const getters = {
  getUser(state, getters) {
    if (!state.user) {
      const res = axios
        .get('/api/user/profile/', getters.getHttpHeader)
        .then(res => (state.user = res.data));
    }
    return state.user;
  },
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
  },
  getStep(state, getters) {
    return getters.getUser.state_step;
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
  },
  async putStep({ commit, rootGetters }, payload) {
    try {
      let res = await axios.put(
        '/api/steps/',
        {
          state_steps: payload
        },
        {
          headers: rootGetters.getHttpHeader
        }
      );
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
