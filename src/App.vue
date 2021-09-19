<template>
  <div id="app">
    <div class="nav">
      <img alt="Vue logo" src="./assets/logo.png"> 
      <router-link class="header vert-centered" to="/notepad">
        <h1>Notepad J.H.</h1>
      </router-link>          
      <div class="auth-status" v-if="authStatus == 'logged in'">
        <div class="vert-centered">{{user.username}}</div>
        <button class="vert-centered auth-button btn btn-primary" @click="logOut" > Log Out</button>
      </div>
    </div>
    <router-view id="router"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  component: {

  },
  methods: {
    logOut: function () {
      this.$store.dispatch('logOut')
        .then(() => this.$router.push('/login'))
    }

  },
  computed: {
    ...mapGetters(['authStatus', 'user'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Allison&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
}
.nav {
  width: 100%;
  box-shadow: 0px 0px 10px 10px rgb(57, 57, 57);
}
img {
  margin: 10px;
  width: 40px; height: 40px;
}
.vert-centered {
  position: relative;
  height: fit-content;
  top: 50%; transform: translateY(-50%); 
}
.header {
  position: relative; left: calc(50% - 130px); top: 32px;
  font-family: 'Allison', cursive;
}
.auth-status {
  margin-left: auto;
  font-size: 13px;
  display: flex; flex-direction: row;
  height: inherit;
  padding: 5px; 
}
.auth-status > * {
    padding: 5px;
}
#router {margin-top: 20px}
.auth-status a {
  font-weight: bold;
  color: #2c3e50;
}
.auth-status a.router-link-exact-active {
  color: #42b983; 
}
</style>
