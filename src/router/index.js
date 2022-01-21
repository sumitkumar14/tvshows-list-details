import Vue from 'vue'
import VueRouter from 'vue-router'
import SeriesList from '../views/SeriesList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SeriesList',
    component: SeriesList
  },
  {
    path: '/SeriesDetails/:showId',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SeriesDetails.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
