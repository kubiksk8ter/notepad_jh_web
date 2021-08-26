<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1 id="header">Notepad J.H.</h1>
    <!--
    <div id="nav">
      <router-link to="/">login</router-link> |
      <router-link to="/notepad">notepad</router-link>
    </div>
    -->
    <router-view/>
  </div>
</template>

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
