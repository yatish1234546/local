import Vue from 'vue';
import './plugins/vuetify';
import { format } from 'date-fns';
import App from './App.vue';
import router from './router';
import store from './state/store';
import './registerServiceWorker';


Vue.config.productionTip = false;

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
Vue.filter('formatDate', (value) => {
  if (value) {
    return format(value, DATE_TIME_FORMAT);
  }
  return '';
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
