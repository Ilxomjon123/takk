const state = () => {
  return {
    user: {},
    token: null
  };
};

const getters = {
  getUser: state => state.user,
  getToken: state => state.token
};
const actions = {};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
    localStorage.setItem('token', payload);
  }
};

export default {
  namecpaced: true,
  state,
  getters,
  actions,
  mutations
};
