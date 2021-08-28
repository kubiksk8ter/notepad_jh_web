<template>
    <div id="sing-up">
      <form @submit.prevent="singUp"
            class="sing-up-form"
            v-on:mouseover="animation='colorize'"
            v-on:mouseleave="animation='decolorize'"
            v-bind:class="animation">
            Sing-up  
        <input  v-model="authDeatails.username" 
                placeholder="username"
                type="text"
                class="form-control"
                formControlName="username">
        <input  v-model="authDeatails.password" 
                placeholder="password"
                type="password"
                class="form-control"
                formControlName="password">
        <input  v-model="passwordRepeat" 
                placeholder="repeat password"
                type="password"
                class="form-control"
                formControlName="repeat password">
        <button type="submit"
                class="btn btn-primary">Sing up
        </button> 
        <div v-if="authFailed">User allready exists</div>         
      </form>
      
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {  
  name: 'singUp',
  data() {
    return {
      authDeatails: {
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
  .colorize {
    background-color: rgb(132, 0, 255);
    transition: background-color 1s ease-in;
  }
  .decolorize {
    background-color: white;
    transition: background-color 1s ease-out;
  }
</style>