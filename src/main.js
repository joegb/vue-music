import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index.js";
import directives from "./plugins/directives.js";
Vue.config.productionTip = false
import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
Vue.use(directives)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
