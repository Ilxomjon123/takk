// pages
import Login from '../views/login/Main.vue';
import DashboardMain from '../views/dashboard/Main.vue';
import Entry from '../views/steps/Entry.vue';
import SquareUp from '../views/steps/SquareUp.vue';
import ErrorPage from '../views/error/index.vue';
import Home from '../views/home/index.vue';
import ForCustomers from '../views/for-customers/index.vue';
import CreateCompany from '../views/steps/CreateCompany.vue';
import CreateCafe from '../views/steps/CreateCafe.vue';
import CreateMenu from '../views/steps/CreateMenu.vue';
import StepFinish from '../views/steps/Finish.vue';

// layouts
import AppLayout from '../layouts/app-layout/index.vue';
import DashboardLayout from '../layouts/dashboard/Main.vue';
import CompanyLayout from '../layouts/dashboard/company/Main.vue';
import CustomLayout from '../layouts/dashboard/Custom.vue';
import EntryLayout from '../layouts/entry/Main.vue';
// import CafeDataList from '../views/dashboard/cafes/index.vue';
// import CafeAdd from '../views/dashboard/cafes/AddForm.vue';
// import CafeEdit from '../views/dashboard/cafes/EditForm.vue';
// import Company from '../views/dashboard/company/Main.vue';
// import Customer from '../views/dashboard/customer/Main.vue';
// import Transaction from '../views/dashboard/transactions/Main.vue';
// import Profile from '../views/profile/Main.vue';
// import Employees from '../views/dashboard/employees/Main.vue';
// import AddNewEmployee from '../views/dashboard/employees/AddNew.vue';
// import AddExistEmployee from '../views/dashboard/employees/AddExist.vue';
// import EditEmployee from '../views/dashboard/employees/Edit.vue';
// import Categories from '../views/dashboard/categories/Main.vue';
// import AddCategory from '../views/dashboard/categories/Add.vue';
// import EditCategory from '../views/dashboard/categories/Edit.vue';
// import Modifiers from '../views/dashboard/modifiers/Main.vue';
// import Products from '../views/dashboard/products/index.vue';
// import ProductAddForm from '../views/dashboard/products/AddForm.vue';
// import ProductEditForm from '../views/dashboard/products/EditForm.vue';
// import Chat from '../views/dashboard/chat/index.vue';

const routes = [
  {
    path: '/square',
    component: SquareUp
  },
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
      requiresAuth: true,
      requiresStep: true
    },
    children: [
      { path: '', name: 'dashboard', component: DashboardMain },
      {
        path: 'cafes',
        name: 'cafes',
        component: () => import('../views/dashboard/cafes/index.vue')
      },
      {
        path: 'cafes/add',
        name: 'cafes-add',
        component: () => import('../views/dashboard/cafes/AddForm.vue')
      },
      {
        path: 'cafes/:id',
        name: 'cafes-edit',
        component: () => import('../views/dashboard/cafes/EditForm.vue')
      },
      {
        path: 'chat',
        name: 'side-menu-chat',
        component: () => import('../views/dashboard/chat/index.vue')
      },
      { path: 'test', name: 'test', component: DashboardMain },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/dashboard/products/index.vue')
      },
      {
        path: 'products/add',
        name: 'products-add',
        component: () => import('../views/dashboard/products/AddForm.vue')
      },
      {
        path: 'products/:id',
        name: 'products-edit',
        component: () => import('../views/dashboard/products/EditForm.vue')
      },
      {
        path: 'company',
        component: CompanyLayout,
        children: [
          {
            path: '',
            name: 'company',
            component: () => import('../views/dashboard/company/Main.vue')
          },
          {
            path: 'app-images',
            name: 'app-images',
            component: () => import('../views/dashboard/company/AppImage.vue')
          }
        ]
      },
      {
        path: 'customer',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'customer',
            component: () => import('../views/dashboard/customer/Main.vue')
          }
        ]
      },
      {
        path: 'transactions',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'transactions',
            component: () => import('../views/dashboard/transactions/Main.vue')
          }
        ]
      },
      {
        path: 'tariffs',
        name: 'tariffs',
        component: () => import('../views/dashboard/company/Tariffs.vue')
      },
      {
        path: 'profile',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'profile',
            component: () => import('../views/profile/Main.vue')
          }
        ]
      },
      {
        path: 'employees',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'employees',
            component: () => import('../views/dashboard/employees/Main.vue')
          },
          {
            path: 'add-new',
            component: () => import('../views/dashboard/employees/AddNew.vue')
          },
          {
            path: 'add-exist',
            component: () => import('../views/dashboard/employees/AddExist.vue')
          },
          {
            path: ':id',
            component: () => import('../views/dashboard/employees/Edit.vue')
          }
        ]
      },
      {
        path: 'categories',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'categories',
            component: () => import('../views/dashboard/categories/Main.vue')
          },
          {
            path: ':menuId/add',
            name: 'categories-add',
            component: () => import('../views/dashboard/categories/Add.vue')
          },
          {
            path: ':menuId/:id',
            name: 'categories-edit',
            component: () => import('../views/dashboard/categories/Edit.vue')
          }
        ]
      },
      {
        path: 'modifiers',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'modifiers',
            component: () => import('../views/dashboard/modifiers/Main.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/entry',
  //   component: Entry,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
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
