<template>
  <Navbar v-if="usuarioActual"/>
  <RouterView />

</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useUsuarioStore } from './stores';

export default defineComponent({
  components:{
    Navbar
  },
  computed:{
    ...mapState(useUsuarioStore,['usuarioActual'])
  }
})

</script>


<style>

</style>