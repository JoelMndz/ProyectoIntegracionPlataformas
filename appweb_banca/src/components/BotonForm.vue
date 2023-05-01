<template>
  <button 
    class="btn w-100" 
    :disabled="cargando"
    type="submit">{{ texto }}</button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props:{
    cargando: {
      type: Boolean,
      required: false,
      default: false
    },
    texto:{
      type: String,
      required: true
    }
  },
  setup(){

    return{
      
    }
  }
})
</script>

<style scoped>
  button{
  background: #ffdd00; 
  color: #0f265c; 
  font-size: 14px; 
  padding-top: 10px;
  padding-bottom: 10px;
}

button:hover{
  background: #ffd100; 
}

button:disabled{
  background: #f0da77; 
}
</style>