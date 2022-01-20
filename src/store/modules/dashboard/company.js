import axios from 'axios';

const state = () => {
  return {
    company: {}
  };
};

const getters = {
  getCompany: state => state.company
};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  }
};

const actions = {
  async fetchCompany({ commit, rootGetters }) {
    axios
      .get('/api/companies/', {
        headers: rootGetters.getHttpHeader,
        params: {
          id: rootGetters.getUser.company_id
        }
      })
      .then(res => {
        commit('setCompany', res.data);
      })
      .catch(err => {
        commit('setCompany', err.response.data);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
