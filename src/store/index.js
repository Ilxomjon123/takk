import { createStore } from 'vuex';
import main from './main';
import sideMenu from './side-menu';
import adminSideMenu from './admin-side-menu';
import simpleMenu from './simple-menu';
import topMenu from './top-menu';
import user from './modules/user';
import common from './modules/common';
import steps from './modules/steps';
import companyDashboard from './modules/dashboard/company';
import employee from './modules/dashboard/employee';
import menu from './modules/dashboard/menu';
import category from './modules/dashboard/category';
import modifier from './modules/dashboard/modifier';
import cafes from './modules/cafes';
import square from './modules/square';
import adminCompany from './modules/admin/company';
const store = createStore({
  modules: {
    main,
    sideMenu,
    adminSideMenu,
    simpleMenu,
    topMenu,
    user,
    common,
    steps,
    companyDashboard,
    cafes,
    employee,
    menu,
    category,
    modifier,
    square,
    // admin
    adminCompany
  }
});

export function useStore() {
  return store;
}

export default store;
