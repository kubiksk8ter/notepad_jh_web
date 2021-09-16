<template>
  <div id="notepad">
    <button class="create auth-button btn btn-primary" v-on:click="creating=!creating">Create note</button><br>
    <createNoteForm class="note" v-bind:creating='creating' @changeView="creating = false" ></createNoteForm>   
    <div class="notes" v-for="note of notes" v-bind:key="note.id">     
      <div class="note" v-bind:class="{greenBckgrn: note.isDone}">
        <editNoteButton v-on:click.native="editNoteMethod(noteDetails)"></editNoteButton>       
        <deleteNoteButton v-on:click.native="deleteNoteMethod(note.id)" ></deleteNoteButton>      
        <div class="title">{{note.title}}</div>
        <div class="body">{{note.body}}</div>
      </div>      
    </div>
  </div>   
</template>

<script>
import { mapActions } from 'vuex'
import { LOGGED_IN_USER_NOTES } from '@/graphql/queries'
import createNoteForm from '../components/createNoteForm.vue'
import editNoteButton from '../components/editNoteButton.vue' 
import deleteNoteButton from '../components/deleteNoteButton.vue'
export default {  
  name: 'notepad',
  components: {
    createNoteForm,
    editNoteButton,
    deleteNoteButton
  },
  data() {
    return {
      creating: false,
      noteDetails: {
        id: 91, 
        title: "Edit test note", 
        body: "Success2", 
        isDone: false
      }       
    }   
  },
  created() {
    
  },
  methods: {     
    ...mapActions(['deleteNote', 'editNote']),
    async deleteNoteMethod(id) {
      await this.deleteNote(id)
    },
    async editNoteMethod() {
      await this.editNote(this.noteDetails)
    }
  },
  apollo: {
    notes: {
      query: LOGGED_IN_USER_NOTES,
      update: data => data.notesByUser
    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notes {
    display: inline;
    text-align: right;   
  }
  .note {
    border: 1px solid black;
    border-radius: 5px;   
    margin: 10px; padding: 10px;
    display: inline-block;
    min-width: 100px; min-height: 100px;
  } 
  .title {
    font-weight: 900;
    text-align: center;
  }
  .body {
    font-size: 14px;
    text-align: center;
  }
  .greenBckgrn {
    background-color: rgb(116, 193, 116);
  }
</style>