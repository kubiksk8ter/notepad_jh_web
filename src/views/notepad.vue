<template>
  <div id="notepad">
    <h1>Hey {{user.username}} you have been authenticated</h1>
    <div class="notes" v-for="note of notes" v-bind:key="note.id">
      <div class="note">
        <div class="title">{{note.title}}</div>
        <div class="body">{{note.body}}</div>
        <div class="isDone">{{note.isDone}}</div>
      </div>
      
    </div>
  </div>   
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {  
  name: 'notepad',
  data() {
    return {
      
    }   
  },
  created() {
    this.fetchNotes() 
  },
  methods: {     
    ...mapActions(['fetchNotes']),
  },
  computed: {
    ...mapGetters(['user', 'notes']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notes {
    display: inline;    
  }
  .note {
    border: 1px solid black;
    border-radius: 5px;
    width: fit-content;
    margin: 10px; padding: 10px;
    display: inline-block;
  }
  .title {
    font-weight: 900;
  }
  .body {
    font-size: 14px;
  }
  .green-bckgrn {
    background-color: green;
  }
</style>