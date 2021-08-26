<template>
    <div id="login">
      <form @submit.prevent="login"
            class="login-form"
            v-on:mouseover="animation='colorize'"
            v-on:mouseleave="animation='decolorize'"
            v-bind:class="animation">
            Log-in  
        <input  v-model="username" 
                placeholder="username"
                type="text"
                class="form-control"
                formControlName="username">
        <input  v-model="password" 
                placeholder="password"
                type="password"
                class="form-control"
                formControlName="password">        
        <button type="submit"
                class="btn btn-primary"
                v-on:click="login()">Log in
        </button>
        <div v-if="authFailed">Login failed</div> <br>
        <router-link to="/singUp" style="font-size:10px">Register new user</router-link>     
      </form>
      
    </div>
</template>

<script>
//import "./Users.gql"

export default {  
  name: 'login',
  data() {
    return {
      username: "",
      password: "",
      animation: "",
      users: [],
      authFailed: false, 
      
    }   
  },
  created() {
    this.getUsernames();
  },
  methods: {     
    login() {   
      this.$router.push("notepad")
    },
    async getUsernames() {
      /*
      await this.$apollo.query({query: Users}).then((res) => {
          this.users = res?.data?.users
        })
      */
      /*
      for(let user of this.users) {
        console.log(user.username)
      }
      */
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-form {
    width: 270px;
    border-radius: 5px;
    border: 1px solid rgb(155, 137, 137);
    padding: 5px;    
  }
  .login-form > * {
    margin-top: 5px;
  }
  .colorize {
    background-color: rgb(132, 0, 255);
    transition: background-color 1s ease-in;
  }
  .decolorize {
    background-color: white;
    transition: background-color 1s ease-out;
  }
</style>