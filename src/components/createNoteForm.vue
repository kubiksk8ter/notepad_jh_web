<template >
<transition name="roll">
  <div id="createNoteForm" v-show="creating">
    
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
</transition>     
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
  .roll-enter-active, .roll-leave-active {
    transition: all .5s;
  }
  .roll-enter, .roll-leave-to {
    opacity: 0;
    transform: scale(0, 0);
  }
</style>