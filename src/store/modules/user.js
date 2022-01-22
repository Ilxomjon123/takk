import axios from 'axios';

const REQUIRED_DETAILS = 'required_details';

const state = () => {
  return {
    token: null,
    user: {},
    STEP_ENTRY: null,
    STEP_COMPANY: 1,
    STEP_CAFE: 2,
    STEP_MENU: 3,
    STEP_DASHBOARD: 4
  };
};

const getters = {
  getUser() {
    const user = JSON.parse(localStorage.getItem(REQUIRED_DETAILS))?.user;
    // const user = JSON.parse(localStorage.getItem('user'));
    // if (!state.user) {
    //   const res = axios
    //     .get('/api/user/profile/', getters.getHttpHeader)
    //     .then(res => (state.user = res.data));
    // }
    return user;
  },
  getToken() {
    // if (state.token != null) {
    //   return state.token;
    // } else {
    // const token = localStorage.getItem('token');
    const token = JSON.parse(localStorage.getItem(REQUIRED_DETAILS))?.token;

    //   if (token != null) state.token = token;
    // }
    return token;
  },
  getHttpHeader(state, getters) {
    return {
      Authorization: `Token ${getters.getToken}`
    };
  },
  getStep(state, getters) {
    return getters.getUser.state_steps;
  }
};
const mutations = {
  // setUser(state, payload) {
  //   // localStorage.setItem('user', JSON.stringify(payload));
  //   let details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
  //   details.user = payload;
  //   localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(details));
  //   state.user = payload;
  // },
  // setToken(state, payload) {
  //   state.token = payload;
  //   let details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
  //   details.token = payload;
  //   localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(details));
  //   // localStorage.setItem('token', payload);
  // },
  setRequiredDetails(state, payload) {
    state.token = payload;
    localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(payload));
  },
  setStep(state, payload) {
    let required_details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
    required_details.user.state_steps = payload;
    localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(required_details));
  },
  setCompanyId(state, payload) {
    let required_details = JSON.parse(localStorage.getItem(REQUIRED_DETAILS));
    required_details.user.company_id = payload;
    localStorage.setItem(REQUIRED_DETAILS, JSON.stringify(required_details));
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
    console.log(payload);
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
      commit('setStep', payload);
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
  logout() {
    localStorage.removeItem(REQUIRED_DETAILS);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
