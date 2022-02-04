import Login from '../views/login/Main.vue';
import Entry from '../views/steps/Entry.vue';
import ErrorPage from '../views/error/index.vue';
import Home from '../views/home/index.vue';
import ForCustomers from '../views/for-customers/index.vue';
import AppLayout from '../layouts/app-layout/index.vue';
import CreateCompany from '../views/steps/CreateCompany.vue';
import CreateCafe from '../views/steps/CreateCafe.vue';
import CreateMenu from '../views/steps/CreateMenu.vue';
import StepFinish from '../views/steps/Finish.vue';
import DashboardLayout from '../layouts/dashboard/Main.vue';
import CompanyLayout from '../layouts/dashboard/company/Main.vue';
import EntryLayout from '../layouts/entry/Main.vue';
import DashboardMain from '../views/dashboard/Main.vue';
import CafeDataList from '../views/cafes/index.vue';
import CafeAdd from '../views/cafes/AddForm.vue';
import CafeEdit from '../views/cafes/EditForm.vue';
import Company from '../views/dashboard/company/Main.vue';
import Customer from '../views/dashboard/customer/Main.vue';
import Transaction from '../views/dashboard/transactions/Main.vue';
import Profile from '../views/profile/Main.vue';
import Employees from '../views/dashboard/employees/Main.vue';
import AddNewEmployee from '../views/dashboard/employees/AddNew.vue';
import AddExistEmployee from '../views/dashboard/employees/AddExist.vue';
import EditEmployee from '../views/dashboard/employees/Edit.vue';
import Categories from '../views/dashboard/categories/Main.vue';

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
        name: 'side-menu-cafe',
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
      },
      {
        path: 'transactions',
        component: CompanyLayout,
        children: [{ path: '', name: 'transactions', component: Transaction }]
      },
      {
        path: 'profile',
        component: CompanyLayout,
        children: [{ path: '', name: 'profile', component: Profile }]
      },
      {
        path: 'employees',
        component: CompanyLayout,
        children: [
          { path: '', name: 'employees', component: Employees },
          { path: 'add-new', component: AddNewEmployee },
          { path: 'add-exist', component: AddExistEmployee },
          { path: ':id', component: EditEmployee }
        ]
      },
      {
        path: 'categories',
        component: CompanyLayout,
        children: [{ path: '', name: 'categories', component: Categories }]
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
    component: Entry
  },
  {
    path: '/entry',
    component: EntryLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'company',
        name: 'entry-company',
        component: CreateCompany
      },
      {
        path: 'cafe',
        name: 'entry-cafe',
        component: CreateCafe
      },
      {
        path: 'finish',
        name: 'entry-finish',
        component: StepFinish
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
