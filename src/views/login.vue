<template>
    <div id="login">
      <form @submit.prevent="loginUser"
            class="login-form"
            v-on:mouseover="animation='colorize'"
            v-on:mouseleave="animation='decolorize'"
            v-bind:class="animation">
            Log-in  
        <input  v-model="authDetails.username" 
                placeholder="username"
                type="text"
                class="form-control"
                formControlName="username">
        <input  v-model="authDetails.password" 
                placeholder="password"
                type="password"
                class="form-control"
                formControlName="password">        
        <button type="submit"
                class="btn btn-primary">Log in
        </button>
        <div v-if="authFailed">Login failed</div> <br>
        <router-link to="/singUp" style="font-size:10px">Register new user</router-link>     
      </form>
      
    </div>
</template>

<script>
import { mapActions } from 'vuex'
//import gql from 'graphql-tag'
export default {  
  name: 'login',
  data() {
    return {
      authDetails: {
        username: "",
        password: ""
      },     
      animation: "",
      users: [],
      authFailed: false, 
      
    }   
  },
  created() {
    //this.getUsernames()
  },
  methods: {
    ...mapActions(['login']),
         
    loginUser: function() {   
        this.login(this.authDetails).then(()=>this.$router.push("/notepad"))
    } 
    /*
    await this.$apollo.mutate({ mutation: gql`
        mutation LoginMutation($loginUsername: String! $loginPassword: String!) {
        login(username: $loginUsername password: $loginPassword) {
            token                   
            }
        }`
      , variables: { loginUsername: 'User3', loginPassword: 'admin'} }).then((res)=> {
        console.log('User loged in!')
        console.log(res?.data?.login.token)
      })
    }
    */
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