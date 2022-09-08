// pages
import Login from '../views/login/Main.vue';
import DashboardMain from '../views/dashboard/Main.vue';
import AdminMain from '../views/admin/Main.vue';
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
import AdminLayout from '../layouts/admin/Main.vue';
import CompanyLayout from '../layouts/dashboard/company/Main.vue';
import AdminCompanyLayout from '../layouts/admin/AdminCompanyLayout.vue';
import CustomLayout from '../layouts/dashboard/Custom.vue';
import EntryLayout from '../layouts/entry/Main.vue';

const routes = [
  {
    path: '/square',
    component: SquareUp,
  },
  {
    path: '/stripe',
    component: import('../views/steps/Stripe.vue'),
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'coffee-shops-home',
        component: Home,
      },
      {
        path: '/for-customers',
        name: 'for-customers',
        component: ForCustomers,
      },
    ],
  },
  // admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresSuperUser: true,
    },
    children: [
      { path: '', name: 'admin-dashboard', component: AdminMain },
      {
        path: 'cafes',
        name: 'admin-cafes',
        component: () => import('../views/admin/cafes/index.vue'),
      },
      {
        path: 'cafes/add',
        name: 'admin-cafes-add',
        component: () => import('../views/admin/cafes/AddForm.vue'),
      },
      {
        path: 'cafes/:id',
        name: 'admin-cafes-edit',
        component: () => import('../views/admin/cafes/EditForm.vue'),
      },
      {
        path: 'chat',
        name: 'admin-side-menu-chat',
        component: () => import('../views/admin/chat/index.vue'),
      },
      { path: 'test', name: 'admin-test', component: DashboardMain },

      // products
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('../views/admin/products/index.vue'),
      },
      {
        path: 'products/add',
        name: 'admin-products-add',
        component: () => import('../views/admin/products/AddForm.vue'),
      },
      {
        path: 'products/:id',
        name: 'admin-products-edit',
        component: () => import('../views/admin/products/EditForm.vue'),
      },

      // categories
      {
        path: 'categories',
        name: 'admin-categories',
        component: () => import('../views/admin/categories/Main.vue'),
      },
      {
        path: 'categories/add',
        name: 'admin-categories-add',
        component: () => import('../views/admin/categories/Add.vue'),
      },
      {
        path: 'categories/:id',
        name: 'admin-categories-edit',
        component: () => import('../views/admin/categories/Edit.vue'),
      },
      {
        path: 'company',
        children: [
          {
            path: '',
            name: 'admin-company',
            component: () => import('../views/admin/company/index.vue'),
          },
          {
            path: 'form',
            component: AdminCompanyLayout,
            children: [
              {
                path: '',
                name: 'admin-company-form',
                component: () =>
                  import('../views/admin/company/CompanyForm.vue'),
              },
              {
                path: 'banking',
                name: 'admin-company-banking',
                component: () => import('../views/admin/company/Banking.vue'),
              },
              {
                path: 'app-images',
                name: 'admin-company-app-images',
                component: () => import('../views/admin/company/AppImage.vue'),
              },
              {
                path: 'square',
                name: 'admin-company-square',
                component: () => import('../views/admin/company/Square.vue'),
              },
              {
                path: 'tariffs',
                name: 'admin-company-tariffs',
                component: () => import('../views/admin/company/Tariffs.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'customer',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'admin-customer',
            component: () => import('../views/admin/customer/Main.vue'),
          },
        ],
      },
      {
        path: 'transactions',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'admin-transactions',
            component: () => import('../views/admin/transactions/Main.vue'),
          },
        ],
      },
      // profile
      {
        path: 'profile',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'admin-profile',
            component: () => import('../views/profile/Main.vue'),
          },
        ],
      },
      // employees
      {
        path: 'employees',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'admin-employees',
            component: () => import('../views/admin/employees/Main.vue'),
          },
          // {
          //   path: 'add-new',
          //   name: 'admin-employees-add-new',
          //   component: () => import('../views/admin/employees/AddNew.vue')
          // },
          {
            path: 'add-exist',
            name: 'admin-employees-add-exist',
            component: () => import('../views/admin/employees/AddExist.vue'),
          },
          {
            path: ':id',
            name: 'admin-employees-edit',
            component: () => import('../views/admin/employees/Edit.vue'),
          },
        ],
      },
      // {
      //   path: 'categories',
      //   component: CustomLayout,
      //   children: [
      //     {
      //       path: '',
      //       name: 'admin-categories',
      //       component: () => import('../views/admin/categories/Main.vue')
      //     },
      //     {
      //       path: ':menuId/add',
      //       name: 'admin-categories-add',
      //       component: () => import('../views/admin/categories/Add.vue')
      //     },
      //     {
      //       path: ':menuId/:id',
      //       name: 'admin-categories-edit',
      //       component: () => import('../views/admin/categories/Edit.vue')
      //     }
      //   ]
      // },
      {
        path: 'modifiers',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'admin-modifiers',
            component: () => import('../views/admin/modifiers/Main.vue'),
          },
        ],
      },
    ],
  },
  // dashboard routes
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      requiresStep: true,
    },
    children: [
      { path: '', name: 'dashboard', component: DashboardMain },
      {
        path: 'cafes',
        name: 'cafes',
        component: () => import('../views/dashboard/cafes/index.vue'),
      },
      {
        path: 'cafes/add',
        name: 'cafes-add',
        component: () => import('../views/dashboard/cafes/AddForm.vue'),
      },
      {
        path: 'cafes/:id',
        name: 'cafes-edit',
        component: () => import('../views/dashboard/cafes/EditForm.vue'),
      },
      {
        path: 'chat',
        name: 'side-menu-chat',
        component: () => import('../views/dashboard/chat/index.vue'),
      },
      { path: 'test', name: 'test', component: DashboardMain },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/dashboard/products/index.vue'),
      },
      {
        path: 'products/add',
        name: 'products-add',
        component: () => import('../views/dashboard/products/AddForm.vue'),
      },
      {
        path: 'products/:id',
        name: 'products-edit',
        component: () => import('../views/dashboard/products/EditForm.vue'),
      },
      {
        path: 'company',
        component: CompanyLayout,
        children: [
          {
            path: '',
            name: 'company',
            component: () => import('../views/dashboard/company/Main.vue'),
          },
          {
            path: 'banking',
            name: 'banking',
            component: () => import('../views/dashboard/company/Banking.vue'),
          },
          {
            path: 'app-images',
            name: 'app-images',
            component: () => import('../views/dashboard/company/AppImage.vue'),
          },
          {
            path: 'square',
            name: 'square',
            component: () => import('../views/dashboard/company/Square.vue'),
          },
          {
            path: 'tariffs',
            name: 'tariffs',
            component: () => import('../views/dashboard/company/Tariffs.vue'),
          },
        ],
      },
      {
        path: 'customer',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'customer',
            component: () => import('../views/dashboard/customer/Main.vue'),
          },
        ],
      },
      {
        path: 'transactions',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'transactions',
            component: () => import('../views/dashboard/transactions/Main.vue'),
          },
        ],
      },
      // {
      //   path: 'tariffs',
      //   name: 'tariffs',
      //   component: () => import('../views/dashboard/company/Tariffs.vue')
      // },
      {
        path: 'profile',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'profile',
            component: () => import('../views/profile/Main.vue'),
          },
        ],
      },
      {
        path: 'employees',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'employees',
            component: () => import('../views/dashboard/employees/Main.vue'),
          },
          // {
          //   path: 'add-new',
          //   name: 'employees-add-new',
          //   component: () => import('../views/dashboard/employees/AddNew.vue')
          // },
          {
            path: 'add-exist',
            name: 'employees-add-exist',
            component: () =>
              import('../views/dashboard/employees/AddExist.vue'),
          },
          {
            path: ':id',
            name: 'employees-edit',
            component: () => import('../views/dashboard/employees/Edit.vue'),
          },
        ],
      },
      {
        path: 'categories',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'categories',
            component: () => import('../views/dashboard/categories/Main.vue'),
          },
          {
            path: ':menuId/add',
            name: 'categories-add',
            component: () => import('../views/dashboard/categories/Add.vue'),
          },
          {
            path: ':menuId/:id',
            name: 'categories-edit',
            component: () => import('../views/dashboard/categories/Edit.vue'),
          },
        ],
      },
      {
        path: 'modifiers',
        component: CustomLayout,
        children: [
          {
            path: '',
            name: 'modifiers',
            component: () => import('../views/dashboard/modifiers/Main.vue'),
          },
        ],
      },
    ],
  },
  // auth routes
  {
    path: '/login',
    name: 'login',
    component: Login,
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
      requiresAuth: true,
      isEntry: true,
    },
    children: [
      {
        path: 'company',
        name: 'entry-company',
        component: CreateCompany,
      },
      {
        path: 'cafe',
        name: 'entry-cafe',
        component: CreateCafe,
      },
      {
        path: 'finish',
        name: 'entry-finish',
        component: StepFinish,
      },
      {
        path: 'menu',
        component: CreateMenu,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
  },
];

export default routes;
