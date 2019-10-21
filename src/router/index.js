import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () =>
      import(/* webpackChunkName: "recommend" */ '../views/recommend/recommend.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () =>
      import(/* webpackChunkName: "singer" */ '../views/singer/singer.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () =>
      import(/* webpackChunkName: "rank" */ '../views/rank/rank.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "search" */ '../views/search/search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
