<template>
    <h1>Hey {{user.name}} you have been authenticated</h1>
</template>

<script>
import { mapGetters } from 'vuex'
export default {  
  name: 'notepad',
  data() {
    return {
      
    }   
  },
  created() {
   
  },
  methods: {     

  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>