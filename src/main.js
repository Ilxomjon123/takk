import { createApp } from 'vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';

import router from './router';
import store from './store';
import App from './App.vue';
import utils from './utils';
import './libs';
import globalComponents from './global-components';
import VueApexCharts from 'vue3-apexcharts';

// SASS Theme
import './assets/sass/app.scss';

const app = createApp(App)
  .use(store)
  .use(router)
  // .use(VueAxios, axios)
  .use(VueApexCharts);

globalComponents(app);
utils(app);

app.mixin({
  methods: {
    toMonthName: function(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return date.toLocaleString('en-US', {
        month: 'short'
      });
    }
  }
});
app.mount('#app');
