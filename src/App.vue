<template>
  <div id="app">
    <div class="nav">
      <router-link to="/login" style="font-size:10px; position: absolute; left: 18px;">
      <!-- svg icon 1 -->
      <svg class="logo" version="1.1" id="Layer_1" 
          xmlns="http://www.w3.org/2000/svg" 
          x="0px" y="0px" width="36px" height="39px"     
          xml:space="preserve">
          <path d="M 5.1 5.6 l 14.3 0 m -14.3 5.2 l 23.4 0 m -23.4 5.2 l 
                  23.4 0 m -23.4 5.2 l 23.4 0 m -23.4 5.2 l 23.4 0 m -23.4 5.2 
                  l 23.4 0 M 5 2 L 29 2 C 31 2 32 3 32 5 L 32 32 C 32 34 31 35 
                  29 35 L 5 35 C 3 35 2 34 2 32 L 2 5 C 2 3 3 2 5 2"
                style='fill:none;
                stroke: #777777;
                stroke-width: 2px'
                stroke-linecap="round" 
          />
      </svg>
      </router-link> 
      <router-link class="header" to="/notepad">
        <div>Notepad J.H.</div>
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
  min-height: 60px;
}
.logo {
  position: relative;
  top: 9px;
}
.vert-centered {
  position: relative;
  height: fit-content;
  top: 50%; transform: translateY(-50%); 
}
.header {
  position: relative; left: 45px; top: 2px;
  font-family: 'Allison', cursive;
  font-size: 35px;
  text-decoration: none;
  color: rgb(116, 193, 116); 
  width: 180px; 
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
