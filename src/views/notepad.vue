<template>
  <div id="notepad">
    <!-- Create note button --> 
    <button class="create auth-button btn btn-primary" 
            v-on:click="creating=!creating">Create note
    </button><br>
    
    <createNoteForm class="note" 
                    v-bind:creating='creating' 
                    @changeView="creating = false" >
    </createNoteForm> 
                    
    <div class="notes" 
         v-for="note of notes" 
         v-bind:key="note.id">

      <div class="note"
           v-if="note.id!=editedNote.id || !editing" 
           v-bind:class="{greenBckgrn: note.isDone}"          
           >
        <editNoteButton v-on:click.native="showForm(note.id)"></editNoteButton>       
        <deleteNoteButton v-on:click.native="deleteNoteMethod(note)" ></deleteNoteButton>      
        <div class="title">{{note.title}}</div>
        <div class="body">{{note.body}}</div>        
      </div>

      <editNoteForm class="note"
                    v-if="note.id==editedNote.id && editing"
                    v-bind:editing='editing' 
                    v-bind:note="editedNote"
                    @changeView="editing = false">
      </editNoteForm>

    </div>         
  </div>   
</template>

<script>
import { mapActions } from 'vuex'
import { LOGGED_IN_USER_NOTES } from '@/graphql/queries'
import editNoteForm from '../components/editNoteForm.vue'
import createNoteForm from '../components/createNoteForm.vue'
import editNoteButton from '../components/editNoteButton.vue' 
import deleteNoteButton from '../components/deleteNoteButton.vue'
export default {  
  name: 'notepad',
  components: {
    editNoteForm,
    createNoteForm,
    editNoteButton,
    deleteNoteButton
  },
  data() {
    return {
      editedNote: {},
      creating: false,
      editing: false,       
    }   
  },
  methods: {     
    ...mapActions(['deleteNote', 'editNote']),

    async deleteNoteMethod(note) {
      if(confirm(`Do you really want to delete "${note.title}" note?`)) {
        await this.deleteNote(note.id)
      }        
    },

    showForm(id) {     
      this.editedNote = this.notes.find(obj => 
        obj.id == id     
      )
      this.editing = true
    }

  },
  apollo: {
    notes: {
      query: LOGGED_IN_USER_NOTES,
      update: data => data.notesByUser
    }
  },
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
    width: 200px; min-height: 100px;
    vertical-align: top;
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