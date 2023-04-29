<template>
  <nav class="navbar navbar-light bg-light">
    <span class="navbar-brand">
      App
    </span>
    <div class="me-4">
      <RouterLink to="/">Login</RouterLink> 
       | 
      <RouterLink to="/registro">Registro</RouterLink>
    </div>
  </nav>
</template>

<script lang="ts">

  import {defineComponent} from 'vue';
  import { RouterLink, RouterView } from 'vue-router'
  export default defineComponent({
    setup(){

      return{

      }
    },
    
  })

</script>



<style>

</style>