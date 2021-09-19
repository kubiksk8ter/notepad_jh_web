<template >
  <div id="createNoteForm" class="rollDown" v-show="creating">
    
    <h6>Create note</h6>

    <form @submit.prevent="createNoteMethod"
          class="newNoteForm">
      <!-- Note title -->      
      <input  v-model="noteDetails.title" 
              placeholder="Title"
              type="text"
              class="form-control"
              formControlName="title">
      <!-- Note body -->         
      <textarea v-model="noteDetails.body" 
                placeholder="body"
                type="text"
                class="form-control"
                formControlName="body" />
      <!-- Note isDone -->           
      <div style="text-align: ceneter">Is note done?&nbsp;&nbsp;&nbsp;&nbsp;
        <input  v-model="noteDetails.isDone"
                type="checkbox" 
                class="_checkbox_1bhvr_30" 
                ><br>
      </div>
        
      <button type="submit"
              class="btn btn-primary"
              >Create
      </button>

    </form> 
    
  </div>   
</template>

<script>
import { mapActions } from 'vuex' 
export default {  
  name: 'createNoteForm',
  props: {creating: Boolean},
  data() {
    return {
      noteDetails: {
        title: "",
        body: "",
        isDone: false
      },       
    }   
  },
  methods: {     
    ...mapActions(['createNote']),
    async createNoteMethod() {    
      await this.createNote(this.noteDetails) 
      this.$emit('changeView', this.creating) 
      this.noteDetails.title = ""
      this.noteDetails.body = ""
      this.noteDetails.isDone = false     
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @keyframes rollDown {
    0% {width: 0px; height: 0px; opacity: 0}
    100%{width: 200px; height: 225px; opacity: 1}
  }
  .rollDown {
    animation-name: rollDown;
    animation-duration: 0.7s;
    overflow: hidden;
  }
</style>