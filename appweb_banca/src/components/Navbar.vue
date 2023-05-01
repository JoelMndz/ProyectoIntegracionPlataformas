<template>
  <nav class="navbar navbar-light bg-light">
    <span class="navbar-brand">
      Banca WEB
    </span>
    <div class="me-4">
      <span>{{ nombreCompleto() }}</span>
      <span>Salir</span>
    </div>
  </nav>
</template>

<script lang="ts">

  import { useUsuarioStore } from '@/stores';
import { mapState } from 'pinia';
import {defineComponent} from 'vue';
  export default defineComponent({
    setup(){

      return{

      }
    },
    methods:{

      nombreCompleto(){
        return `${this.usuarioActual?.nombres} ${this.usuarioActual?.apellidos}`
      }
    },
    computed:{
      ...mapState(useUsuarioStore,['usuarioActual'])
    }
  })

</script>



<style>

</style>