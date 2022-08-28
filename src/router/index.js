import { computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';
import store from '@/store';

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

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0);
  const isLoggedIn = computed(() => store.getters['isLoggedIn']);
  const isSuperuser = computed(() => store.getters['isSuperuser']);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn.value) {
      next({ path: '/login' });
    } else {
      await store.dispatch('fetchProfile');

      if (to.matched.some(record => record.meta.requiresSuperUser)) {
        if (!isSuperuser.value) {
          next({ path: '/error' });
        } else {
          next();
        }
      } else {
        if (to.matched.some(record => record.meta.isEntry)) {
          if (isSuperuser.value) next('/admin');
          else next();
        } else {
          next();
        }
      }
    }
  } else {
    next();
  }
});

export default router;
