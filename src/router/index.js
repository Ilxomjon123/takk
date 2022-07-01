import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    return savedPosition || { left: 0, top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const accessToken = JSON.parse(localStorage.getItem('required_details'))
    ?.token;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!accessToken) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
