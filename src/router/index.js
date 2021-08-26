import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import notepad from '../views/notepad.vue'
import singUp from '../views/singUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/singUp',
    name: 'singUp',
    component: singUp
  },
  {
    path: '/notepad',
    name: 'notepad',
    component: notepad
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
] 

const router = new VueRouter({
  routes
})

export default router
