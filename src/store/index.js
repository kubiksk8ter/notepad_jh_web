import Vue from 'vue'
import Vuex from 'vuex'
import { onLogout, apolloClient } from '@/vue-apollo'
import { LOGGED_IN_USER } from '@/graphql/queries'
import { LOGIN_USER, REGISTER_USER } from '@/graphql/mutations'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('apollo-token') || null,
    user: {},
    authStatus: 'logged out'
  },
  plugins: [createPersistedState()],
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.authStatus,
    user: state => state.user
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOGIN_USER (state, user) {
      state.authStatus = 'logged in'
      state.user = { ...user }
      /*test
      setTimeout(()=>{
        console.log("Vuex:\nisAuth: " + state.isAuthenticated + "\nauthStatus: " + state.authStatus + "\nuserId: " + state.user.id)
      },1000)
      */
    },
    LOGOUT_USER (state) {
      state.authStatus = 'logged out'
      state.token = '' && localStorage.removeItem('apollo-token')
      state.user = {}
    }
  },

  actions: {
    async register ({ commit, dispatch }, authDetails) {
      try {      
        const { data } = await apolloClient.mutate({ mutation: REGISTER_USER, variables: { ...authDetails } })
        const token = JSON.stringify(data.createUser.token)
        commit('SET_TOKEN', token)
        //onLogin(apolloClient, user.token)
        localStorage.setItem('apollo-token', token)
        dispatch('setUser')
      } catch (e) {
        if(e.message.includes("Unique constraint failed on the fields: (`username`)")) {
          console.log("Account whit this username allready exists!")
        }       
      }
    },
    async login ({ commit, dispatch }, authDetails) {
      try {      
        const { data } = await apolloClient.mutate({ mutation: LOGIN_USER, variables: { ...authDetails } })
        const token = JSON.stringify(data.login.token)
        commit('SET_TOKEN', token)
        localStorage.setItem('apollo-token', token)
        dispatch('setUser')
      } catch (e) {
        if(e.message == "GraphQL error: Cannot read property 'password' of null") {
          console.log("Incorrect name or password!")
        }
        console.log(e.message)
      }
    },
    async setUser ({ commit }) {
      const { data } = await apolloClient.query({ query: LOGGED_IN_USER })
      commit('LOGIN_USER', data.me)
    },
    async logOut ({ commit }) {
      commit('LOGOUT_USER')
      onLogout(apolloClient)
    } 
  },

  modules: {
  }
})
