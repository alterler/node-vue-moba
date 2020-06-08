import Vue from 'vue'
import App from './App.vue'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'

import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')