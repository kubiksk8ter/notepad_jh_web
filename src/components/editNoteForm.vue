<template >
  <div id="editNoteForm" class="rollDown" v-show="editing">

    <form @submit.prevent="editNoteMethod"     
          class="newNoteForm">

      <h6 style="text-align: center">Edit note</h6>   
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
      <div style="text-align: center">Is note done?&nbsp;&nbsp;&nbsp;&nbsp;
        <input  v-model="noteDetails.isDone"
                type="checkbox" 
                class="_checkbox_1bhvr_30" 
                ><br> 
      </div>
        
      <button type="submit"
              class="btn btn-primary"
              >Edit
      </button>

    </form> 
    
  </div>   
</template>

<script>
import { mapActions } from 'vuex' 
export default {  
  name: 'editNoteForm',
  data() {
    return {
      noteDetails: {
        id: this.note.id,
        title: this.note.title,
        body: this.note.body,
        isDone: this.note.isDone
      },       
    }   
  },
  props: {
      note: Object,
      editing: Boolean
    },
  methods: {     
    ...mapActions(['editNote']),    
    async editNoteMethod() {
      await this.editNote(this.noteDetails)
      this.$emit('changeView', this.editing)           
    },    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @keyframes rollDown {
    0% {height: 0px; opacity: 0}
    100%{height: 225px; opacity: 1}
  }
  .rollDown {
    animation-name: rollDown;
    animation-duration: 0.7s;
    overflow: hidden;

  }
</style>