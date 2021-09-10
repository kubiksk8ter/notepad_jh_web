import Vue from 'vue'
import Vuex from 'vuex'
import { onLogout, apolloClient } from '@/vue-apollo'
import { LOGGED_IN_USER, LOGGED_IN_USER_NOTES } from '@/graphql/queries'
import { LOGIN_USER, REGISTER_USER } from '@/graphql/mutations'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('apollo-token') || null,
    user: {},
    authStatus: 'logged out',
    error: null
  },
  plugins: [
    createPersistedState({
      paths: ['user','token','authStatus'],
    }),
  ],
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.authStatus,
    user: state => state.user,
    error: state => state.error
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
        console.log("Vuex:\nisAuth: " + "\nauthStatus: " + state.authStatus + "\nuserId: " + state.user.id)
        console.log(state.user)
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
        this.state.error = null
      } catch (e) {
        if(e.message.includes("Unique constraint failed on the fields: (`username`)")) {
          this.state.error = "Account with this username allready exists!"
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
        this.state.error = null
      } catch (e) {
        if(e.message == "GraphQL error: Cannot read property 'password' of null") {
          this.state.error = "Incorrect name or password!"
        }
        else if(e.message == "GraphQL error: Incorrect password") {
          this.state.error = "Incorect password!"
        }
        console.log(e.message)
      }
    },
    async setUser ({ commit }) {
      const { data } = await apolloClient.query({ query: LOGGED_IN_USER })
      commit('LOGIN_USER', data.me);
    },
    async logOut ({ commit }) {
      commit('LOGOUT_USER')
      onLogout(apolloClient)
    },
    async getNotesFromLoggendInUser () {
      await apolloClient.query({ query: LOGGED_IN_USER_NOTES })   
    } 
  },
  modules: {
  }
})
