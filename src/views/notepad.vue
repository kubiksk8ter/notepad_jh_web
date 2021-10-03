<template>
  <div id="notepad">
    
    <!-- Create note button --> 
    <button class="auth-button btn btn-primary" 
            v-on:click="creating=!creating">Create note
    </button><br>

    <input type="checkbox" 
           class=" btn-check" 
           id="btn-check-outlined" 
           v-on:click="reverseNotesStatus()"
           autocomplete="off">
    <label class="arrangement-btn btn btn-outline-success" 
           for="btn-check-outlined"
           title="Sort notes by creation time">{{reverseStatus}}
    </label>

    <div class="arranged">
      <createNoteForm class="note" 
                      v-bind:creating='creating' 
                      @changeView="creating = false" >
      </createNoteForm> 
                      
      <div v-for="note of notes" 
           v-bind:key="note.id">

        <div class="note noteFade"
            v-if="note.id!=editedNote.id || !editing" 
            v-bind:class="{greenBckgrn: note.isDone}"          
            >
          <div class="text">       
            <div class="title">{{note.title}}</div>
            <div class="body">{{note.body}}</div>
            <div class="time">
              <div class="created"
                   title="Creation time">
                {{getTime(note.createdAt)}}</div>
              <div class="updated"
                   title="Update time" 
                   v-if="getTime(note.createdAt) != getTime(note.updatedAt)">
                {{getTime(note.updatedAt)}}</div>
            </div>
          </div> 

          <div class="buttons">  
            <editNoteButton v-on:click.native="showForm(note.id)"></editNoteButton>       
            <deleteNoteButton v-on:click.native="deleteNoteMethod(note)" ></deleteNoteButton>
          </div>
                  
        </div>

        <editNoteForm class="note"
                      v-if="note.id==editedNote.id && editing"
                      v-bind:editing='editing' 
                      v-bind:note="editedNote"
                      @changeView="editing = false">
        </editNoteForm>

      </div>
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
      reverseStatus: "Descending"       
    }   
  },
  methods: {     
    ...mapActions(['deleteNote', 'editNote']),
    async deleteNoteMethod(note) {
      if(confirm(`Do you really want to delete "${note.title}" note?`)) {
        await this.deleteNote(note.id)
      }        
    },
    getTime(date) {
      const formatedDate = new Date(date)
      const day = formatedDate.getDate()
      const month = formatedDate.getMonth()
      const year = formatedDate.getFullYear()
      const hours = formatedDate.getHours()
      const minutes = (formatedDate.getMinutes() < 10 ? '0' : '') + formatedDate.getMinutes()
      const fullTime = `
        ${day}.${month}.${year} - ${hours}:${minutes}
      `
      return fullTime
    },
    showForm(id) {     
      this.editedNote = this.notes.find(obj => 
        obj.id == id     
      )
      this.editing = true
    },
    reverseNotesStatus() {
      this.notes.reverse()
      this.reverseStatus == "Ascending" ? 
      this.reverseStatus = "Descending" : 
      this.reverseStatus = "Ascending"
    },
  },
  apollo: {
    notes: {
      query: LOGGED_IN_USER_NOTES,
      update: data => data.notesByUser
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .arrangement-btn {
    margin-top: 10px; 
    font-size: 13px;
  }
  .arranged {   
    display: flex; 
    flex-flow: row wrap;
    justify-content: center;  
  }
  .note {
    border: 1px solid black;
    border-radius: 5px;   
    margin: 10px; padding: 10px;
    display: flex;
    width: fit-content;
  }
  .text {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    max-width: 200px;     
  }
  .created { color: rgb(53, 145, 53) }
  .updated { color: rgb(24, 96, 221) }
  .title {
    font-weight: 900;
    text-align: center;
  }
  .body {
    font-size: 14px;
    text-align: center;
  }
  .time {
    align-self: flex-start;
    margin-bottom: -8px; margin-top: auto;
    text-align: left;
    font-size: 10px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    width: 36px;
    margin-right: 0; margin-left: auto;
  }
  .greenBckgrn {
    background-color: rgb(116, 193, 116);
  }

  @keyframes noteFade {
    0% {opacity: 0}
    100%{opacity: 1}
  }
  .noteFade {
    animation-name: noteFade;
    animation-duration: 0.7s;
    overflow: hidden;
  }
</style>