<template>
  <div class="row justify-content-center fila bg-light">
    <div class="col-12 p-5 d-flex justify-content-center align-items-center">
      <div class="card" style="width: 500px;">
        <div class="card-body">
          <h2 class="text-center mb-4">Registro</h2>
          <Error v-if="error"/>
          <form @submit.prevent="procesarFormulario">
            <div class="mb-2 row">
              <div class="col-auto">
                <input 
                  class="form-control" 
                  type="text"
                  placeholder="Nombres"
                  v-model="usuario.nombres"
                  required>
              </div>
              <div class="col-auto">
                <input 
                  class="form-control" 
                  type="text"
                  placeholder="Apellidos"
                  v-model="usuario.apellidos"
                  required>
              </div>
            </div>
            <div class="mb-2">
              <input 
                class="form-control" 
                type="text"
                placeholder="Cédula"
                v-model="usuario.cedula"
                required>
            </div>
            <div class="mb-2">
              <label class="form-label" style="font-size: small;">Foto de perfil</label>
              <input 
                class="form-control"
                type="file"
                accept="image/*"
                @change="obtenerImagen"
                placeholder="ok"
                required>
            </div>
            <div class="mb-2">
              <input 
                class="form-control" 
                type="email"
                placeholder="Email"
                v-model="usuario.email"
                required>
            </div>
            <div class="mb-3">
              <input 
                class="form-control" 
                type="password"
                placeholder="Contraseña"
                v-model="usuario.password"
                required>
            </div>
            <BotonForm 
              texto="Registrarse"
              :cargando="cargando"/>
            <div class="mt-3 text-center">
              <RouterLink 
                to="/">Regresar al login</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUsuarioStore, useErrorStore } from '@/stores';
import { mapActions, mapState } from 'pinia';
import {defineComponent, reactive, ref} from 'vue';
import Error from '@/components/Error.vue';
import router from '@/router';
import BotonForm from '@/components/BotonForm.vue'
import { RouterLink } from 'vue-router';

export default defineComponent({
  components:{ Error, BotonForm, RouterLink },
  setup(){
    const usuario = reactive({
      nombres: '',
      apellidos: '',
      cedula: '',
      email: '',
      password: '',
      archivo: null
    });
    const cargando = ref(false);
    
    return{
      usuario,
      cargando
    }
  },
  methods:{
    ...mapActions(useUsuarioStore,['registro']),
    ...mapActions(useErrorStore,['resetarError']),
    async procesarFormulario(){
      this.cargando = true;  
      this.resetarError();
      await this.registro(this.usuario);
      this.cargando = false;
      if(!this.error){
        await router.push('/');
      }
    },
    obtenerImagen(e:any){
      this.usuario.archivo = e.target.files[0];      
    }
  },
  computed:{
    ...mapState(useErrorStore,['error']),
  }
})

</script>

<style scoped>
a{
  color: #2f7abf;
  font-size: 14px;
}
</style>
