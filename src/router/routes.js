import Login from '../views/login/Main.vue';
import Entry from '../views/steps/Entry.vue';
import ErrorPage from '../views/error/index.vue';
import Home from '../views/home/index.vue';
import ForCustomers from '../views/for-customers/index.vue';
import AppLayout from '../layouts/app-layout/index.vue';
import CreateCompany from '../views/steps/CreateCompany.vue';
import CreateCafe from '../views/steps/CreateCafe.vue';
import DashboardLayout from '../layouts/side-menu/Main.vue';
import DashboardMain from '../views/dashboard/Main.vue';

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
    children: [{ path: '/', name: 'dashboard-main', component: DashboardMain }]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/entry',
    component: Entry,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-company',
    component: CreateCompany,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-cafe',
    component: CreateCafe,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
];

export default routes;
