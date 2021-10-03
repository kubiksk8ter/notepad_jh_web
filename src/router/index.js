import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/notepad',
    name: '',
    component: () => import(/* webpackChunkName: "login" */ '@/views/notepad.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
  },
  {
    path: '/singUp',
    name: 'singUp',
    component: () => import(/* webpackChunkName: "register" */ '@/views/singUp.vue')
  },
  {
    path: '/notepad',
    name: 'notepad',
    component: () => import('@/views/notepad.vue'),
    meta: { requiresAuth: true } 
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
] 

const router = new VueRouter({
  mode: 'hash',
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
      if(from.path == "/singUp") {
        next({
          path: '/singUp',
          query: { redirect: to.fullPath }
        })
      }
      else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      store.commit('SET_ERROR', null)
      next()
    }
  } else {
    store.commit('SET_ERROR', null)
    next()
  }
})

export default router
