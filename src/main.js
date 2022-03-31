import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import globalComponents from './global-components';
import utils from './utils';
import './libs';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTelInput from 'vue-tel-input';
// import CKEditor from '@ckeditor/ckeditor5-vue';

// SASS Theme
import './assets/sass/app.scss';
// import 'vue-tel-input/dist/vue-tel-input.css';

axios.interceptors.response.use(undefined, function(error) {
  console.log('ok');
  if (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
      localStorage.removeItem('required_details');

      return router.push('/login');
    }
  }
});

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueTelInput)
  // .use(CKEditor)
  .use(VueAxios, axios);

globalComponents(app);
utils(app);

app.mount('#app');
