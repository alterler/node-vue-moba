import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import HeroDetail from '../views/HeroDetail.vue'
import ArticleDetail from '../views/ArticleDetail.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    component: Main,
    children: [{
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/article/:id',
        name: 'article',
        component: ArticleDetail,
        props: true
      }
    ]
  },
  {
    path: '/heroes/:id',
    name: 'heroes',
    component: HeroDetail,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router