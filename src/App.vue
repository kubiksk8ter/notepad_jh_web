<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1 id="header">Notepad J.H.</h1>
    <div v-if="authStatus" id="nav">
      <div> Hi {{user.name}}</div>
      <button class="auth-button" @click="logOut" > Log Out</button>
    </div>
    <!--
    <div id="nav">
      <router-link to="/">login</router-link> |
      <router-link to="/notepad">notepad</router-link>
    </div>
    -->
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  component: {

  },
  data () {
    return {

    }
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
}
img {
  margin: 10px;
  width: 80px; height: 80px;
}
#header {
  font-size: 25px;
}
#nav {
  font-size: 13px;
  padding-bottom: 15px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983; 
}
</style>
