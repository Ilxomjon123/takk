import Login from '../views/login/Main.vue';
import Entry from '../views/steps/Entry.vue';
import ErrorPage from '../views/error/index.vue';
import Home from '../views/home/index.vue';
import ForCustomers from '../views/for-customers/index.vue';
import AppLayout from '../layouts/app-layout/index.vue';
import CreateCompany from '../views/steps/CreateCompany.vue';
import CreateCafe from '../views/steps/CreateCafe.vue';
import CreateMenu from '../views/steps/CreateMenu.vue';
import DashboardLayout from '../layouts/dashboard/Main.vue';
import CompanyLayout from '../layouts/dashboard/company/Main.vue';
import EntryLayout from '../layouts/entry/Main.vue';
import DashboardMain from '../views/dashboard/Main.vue';
import CafeDataList from '../views/cafes/index.vue';
import CafeAdd from '../views/cafes/AddForm.vue';
import CafeEdit from '../views/cafes/EditForm.vue';
import Company from '../views/dashboard/company/Main.vue';
import Customer from '../views/dashboard/customer/Main.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'coffee-shops-home',
        component: Home
      },
      {
        path: '/for-customers',
        name: 'for-customers',
        component: ForCustomers
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', name: 'dashboard', component: DashboardMain },
      {
        path: 'cafe-data-list',
        name: 'side-menu-cafe-data-list',
        component: CafeDataList
      },
      {
        path: 'cafe-add-form',
        name: 'side-menu-cafe-add-form',
        component: CafeAdd
      },
      {
        path: 'cafe-edit-form/:id',
        name: 'side-menu-cafe-edit-form',
        component: CafeEdit
      },
      { path: 'test', name: 'test', component: DashboardMain },
      {
        path: 'company',
        component: CompanyLayout,
        children: [{ path: '', name: 'company', component: Company }]
      },
      {
        path: 'customer',
        component: CompanyLayout,
        children: [{ path: '', name: 'customer', component: Customer }]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/entry',
    component: EntryLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: Entry
      },
      {
        path: 'company',
        component: CreateCompany
      },
      {
        path: 'cafe',
        component: CreateCafe
      },
      {
        path: 'menu',
        component: CreateMenu
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
];

export default routes;
