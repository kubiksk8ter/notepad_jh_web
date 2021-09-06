<template>
    <div id="sing-up">
      <form @submit.prevent="singUp"
            class="sing-up-form"
            v-on:mouseover="animation='colorize'"
            v-on:mouseleave="animation='decolorize'"
            v-bind:class="animation">
            Sing-up  
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
        <input  v-model="passwordRepeat" 
                placeholder="repeat password"
                type="password"
                class="form-control"
                formControlName="repeat password">
        <div class="error-log" v-if="error != null">
          {{error}}
        </div>
        <button type="submit"
                class="btn btn-primary">Sing up
        </button><br> 
        <router-link to="/login" style="font-size:10px">Login</router-link>          
      </form>
      
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {  
  name: 'singUp',
  data() {
    return {
      authDetails: {
        username: "",
        password: ""
      },
      passwordRepeat: "",
      animation: "",
      users: [],
      authFailed: false,    
    }   
  },
  methods: { 
    ...mapActions(['register']),   
    singUp() {       
      this.register(this.authDetails).then(() => this.$router.push('/notepad'))
    },    
  },
  computed: {
    ...mapGetters(['error'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sing-up-form {
    width: 270px;
    border-radius: 5px;
    border: 1px solid rgb(155, 137, 137);
    padding: 5px;    
  }
  .sing-up-form > * {
    margin-top: 5px;
  }
  .error-log {
    font-size: 14px;
    color: rgb(255, 0, 0);
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