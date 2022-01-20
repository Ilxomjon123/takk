import { createStore } from 'vuex';
import main from './main';
import sideMenu from './side-menu';
import simpleMenu from './simple-menu';
import topMenu from './top-menu';
import user from './modules/user';
import common from './modules/common';
import steps from './modules/steps';
import companyDashboard from './modules/dashboard/company';

const store = createStore({
  modules: {
    main,
    sideMenu,
    simpleMenu,
    topMenu,
    user,
    common,
    steps,
    companyDashboard
  }
});

export function useStore() {
  return store;
}

export default store;
