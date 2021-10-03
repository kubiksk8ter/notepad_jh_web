import Vue from 'vue'
import Vuex from 'vuex'
import { onLogout, apolloClient } from '@/vue-apollo'
import { LOGGED_IN_USER, LOGGED_IN_USER_NOTES } from '@/graphql/queries'
import { LOGIN_USER, REGISTER_USER, CREATE_NOTE, DELETE_NOTE, EDIT_NOTE } from '@/graphql/mutations'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('apollo-token') || null,
    user: {},
    authStatus: 'logged out',
    error: null,
    notes: [],
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
    error: state => state.error,
    notes: state => state.notes
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOGIN_USER (state, user) {
      state.authStatus = 'logged in'
      state.user = { ...user }
    },
    LOGOUT_USER (state) {
      state.authStatus = 'logged out'
      state.token = '' && localStorage.removeItem('apollo-token')
      state.user = {}
    },
    FETCH_NOTES (state, notes) {
      state.notes = [...notes]
    },
    SET_ERROR(state, message) {
      state.error = message
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
          commit('SET_ERROR', "Account with this username allready exists!")
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
        commit('SET_ERROR', null)
      } catch (e) {
        if(e.message == "GraphQL error: Cannot read property 'password' of null") {
          commit('SET_ERROR', "Incorrect name!")
        }
        else if(e.message == "GraphQL error: Incorrect password") {
          commit('SET_ERROR', "Incorect password!")
        }
        else if(e.message == "Network error: NetworkError when attempting to fetch resource.") {
          commit('SET_ERROR', "Server down!")
        }
        //console.log(e.message)
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
    /*
    async fetchNotes ({ commit }) {
      const {data} = await apolloClient.query({ query: LOGGED_IN_USER_NOTES })
      commit('FETCH_NOTES', data.notesByUser)
      //test
      console.log("data: " + data.notesByUser) 
      for(let note of this.state.notes) {
        console.log(note.title)
      }     
    },
    */
    async createNote (_,noteDetails) {
      try {      
        const { data } = await apolloClient.mutate({ mutation: CREATE_NOTE, variables: { ...noteDetails}, refetchQueries: [{query: LOGGED_IN_USER_NOTES}] })           
        console.log("Note " + data.createNote.id + " created!")
      } catch (e) {
        console.log(e.message)
      }       
    },
    async deleteNote (_,deleteNoteId) {
      try {     
        const { data } = await apolloClient.mutate({ mutation: DELETE_NOTE, variables: { deleteNoteId }, refetchQueries: [{query: LOGGED_IN_USER_NOTES}] })
        console.log("Note " + data.deleteNote.id + " deleted!")
      } catch (e) {
        console.log(e.message)
      }       
    },
    async editNote (_,noteDetails) {
      try {     
        const { data } = await apolloClient.mutate({ mutation: EDIT_NOTE, variables: { ...noteDetails }, refetchQueries: [{query: LOGGED_IN_USER_NOTES}] })
        console.log("Note " + data.updateNote.id + " updated!")
      } catch (e) {
        console.log(e.message)
      } 
    }
  },
  modules: {
  }
})
