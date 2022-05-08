import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import globalComponents from './global-components';
import utils from './utils';
import './libs';
import axios from 'axios';
import VueAxios from 'vue-axios';

// SASS Theme
import './assets/sass/app.scss';

axios.interceptors.response.use(undefined, async function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 /* && !originalRequest._retry */) {
      const res = await store.dispatch('refreshToken');
      if (res.status) {
        location.reload();
        originalRequest._retry = true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('required_details');
        window.location = '/login';
      }
    }
    throw error;
  }
});

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios);

globalComponents(app);
utils(app);

app.mount('#app');
