import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import '@/assets/js/flexible';
import './assets/scss/global.scss';

import router from './router';

Vue.config.productionTip = false;

Vue.use(mavonEditor);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
