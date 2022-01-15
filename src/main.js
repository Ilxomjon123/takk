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
// SASS Theme

import './assets/sass/app.scss';
import 'vue-tel-input/dist/vue-tel-input.css';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueTelInput)
  .use(VueAxios, axios);

globalComponents(app);
utils(app);

app.mount('#app');
