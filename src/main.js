import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery';
import Loading from 'vue-loading-overlay'
import currencyFilter from './js/currency'
import './js/bus';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'vue-loading-overlay/dist/vue-loading.css'
import 'swiper/css/swiper.css'
import './assets/scss/all.scss'

Vue.config.productionTip = false
window.$ = $;
// Loading
Vue.component('Loading', Loading);
// axios
Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);
Vue.filter('currency', currencyFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
