<template>
    <div id="sing-up" class="sing-up">

      <form @submit.prevent="singUp"
            class="sing-up-form"
            v-on:mouseover="animation='colorize'"
            v-on:mouseleave="animation='decolorize'"
            v-bind:class="animation"> Sing-up
        <!-- Username -->       
        <input  v-model="authDetails.username" 
                placeholder="username"
                type="text"
                class="form-control"
                formControlName="username">
        <!-- Password -->         
        <input  v-model="authDetails.password" 
                placeholder="password"
                type="password"
                class="form-control"
                formControlName="password">
        <!-- Password repeat -->         
        <input  v-model="passwordRepeat" 
                placeholder="repeat password"
                type="password"
                class="form-control"
                formControlName="repeat password">
        <!-- Error log -->         
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
    }   
  },
  methods: { 
    ...mapActions(['register']),   
    singUp() {
      if(this.validatePassword()) {
        this.register(this.authDetails).then(() => this.$router.push('/notepad'))
      }          
    },
    validatePassword() {
      if (this.authDetails.password.length < 5) {
        this.$store.commit('SET_ERROR', "Password must be longer than 5 characters!")
        return false
      }
      else if(this.authDetails.password != this.passwordRepeat) {
        this.$store.commit('SET_ERROR', "Please repeat password correctly!")
        return false
      }
      else {
        return true
      }      
    }    
  },
  computed: {
    ...mapGetters(['error']),  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sing-up {
    height: calc(100vh - 100px);
  }
  .sing-up-form {
    width: 270px;
    border-radius: 5px;
    border: 1px solid rgb(155, 137, 137);
    padding: 5px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);     
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