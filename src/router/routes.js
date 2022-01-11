import Login from '../views/login/Main.vue';
import Home from '../views/home/index.vue';
import AppLayout from '../layouts/app-layout/index.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'coffee-shops-home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

export default routes;
