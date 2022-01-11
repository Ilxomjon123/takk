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
// import './assets/sass/_tailwind.scss';
import './assets/sass/app.scss';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios);

globalComponents(app);
utils(app);

app.mount('#app');
