<template>
  <div class="notepad">
    <button class="create auth-button btn btn-primary" v-on:click="creating=!creating">Create note</button><br>
    <div class="note" v-if="creating">
      <h6 class="title">Create note form</h6>
      <form @submit.prevent="createNoteMethod"
            class="newNoteForm"> 
        <input  v-model="noteDetails.title" 
                placeholder="Title"
                type="text"
                class="form-control"
                formControlName="title">
        <input  v-model="noteDetails.body" 
                placeholder="body"
                type="text"
                class="form-control"
                formControlName="body">
        <label>Is note done?&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input  v-model="noteDetails.isDone"
                type="checkbox" 
                class="_checkbox_1bhvr_30" ><br>
        <button type="submit"
                class="btn btn-primary">Create
        </button>    
      </form> 
    </div>
    <div class="notes" v-for="note of notes" v-bind:key="note.id">     
      <div class="note" v-bind:class="{greenBckgrn: note.isDone}">
        <button class="note-button auth-button btn btn-primary" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </button>
        <button class="note-button auth-button btn btn-primary" type="button" v-on:click="deleteNoteMethod(note.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
        <div class="title">{{note.title}}</div>
        <div class="body">{{note.body}}</div>
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
      creating: false,
      noteDetails: {
        title: "",
        body: "",
        isDone: false
      },
      
    }   
  },
  created() {
    this.fetchNotes() 
  },
  methods: {     
    ...mapActions(['fetchNotes', 'createNote', 'deleteNote']),
    async createNoteMethod() {
      await this.createNote(this.noteDetails)
      await this.fetchNotes() 
      this.creating = false
    },
    async deleteNoteMethod(id) {
      await this.deleteNote(id)
      await this.fetchNotes()
    }
  },
  computed: {
    ...mapGetters(['notes']),
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
  .note-button {
    width: 30px; height: 30px;
    margin: 2px;    
  }
  .bi {
    position: relative;
    top: -4px; left: -6px;
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