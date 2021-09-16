<template >
  <div id="createNoteForm" v-if="creating">
    <div>
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
                class="btn btn-primary"
                >Create
        </button>    
      </form> 
    </div>
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
  created() {
    
  },
  methods: {     
    ...mapActions(['createNote']),
    async createNoteMethod() {
      await this.createNote(this.noteDetails) 
      this.$emit('changeView', this.creating)      
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>