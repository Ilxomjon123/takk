import { createStore } from 'vuex';
import main from './main';
import sideMenu from './side-menu';
import adminSideMenu from './admin-side-menu';
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
import adminCafe from './modules/admin/cafes';
import adminCategory from './modules/admin/category';
import adminCompany from './modules/admin/company';
import adminMenu from './modules/admin/menu';
import adminEmployee from './modules/admin/employee';

const store = createStore({
  modules: {
    main,
    sideMenu,
    adminSideMenu,
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
    adminCafe,
    adminCategory,
    adminCompany,
    adminMenu,
    adminEmployee
  }
});

export function useStore() {
  return store;
}

export default store;
