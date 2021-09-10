<template>
    <h1>Hey {{user.username}} you have been authenticated</h1>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {  
  name: 'notepad',
  data() {
    return {
      notes: []
    }   
  },
  created() {

  },
  methods: {     
    ...mapActions(['getNotesFromLoggendInUser']),
  },
  computed: {
    ...mapGetters(['user']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>