import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import login from '../views/login.vue'
import notepad from '../views/notepad.vue'
import singUp from '../views/singUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'home',
  },
  {
    path: '/login',
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
    component: notepad,
    meta: { requiresAuth: true }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
] 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Global Route Guards
router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  const isUserLoggedIn = store.getters.isAuthenticated
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      store.dispatch('logOut')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
