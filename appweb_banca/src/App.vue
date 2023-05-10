<template>
  <SpinnerVue v-if="cargando"/>
  <template v-else>
    <Navbar v-if="usuarioActual"/>
    <RouterView />
  </template>

</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { defineComponent, ref } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useUsuarioStore } from './stores';
import SpinnerVue from './components/Spinner.vue';

export default defineComponent({
  components:{
    Navbar,
    SpinnerVue
  },
  setup(){
    const cargando = ref(false);
    return{
      cargando
    }
  },
  methods:{
    ...mapActions(useUsuarioStore,['verificarToken'])
  },
  computed:{
    ...mapState(useUsuarioStore,['usuarioActual'])
  },
  async mounted(){
    this.cargando = true;    
    await this.verificarToken()
    this.cargando = false;
  }
})

</script>


<style>

</style>