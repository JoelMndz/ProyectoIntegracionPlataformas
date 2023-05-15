<template>
  <div class="row justify-content-center fila bg-light">
    <div class="col-12 p-5 d-flex justify-content-center align-items-center">
      <div class="card" style="width: 500px;">
        <div class="card-body">
          <h2 class="text-center mb-4">Bienvenido a tu Banca Web</h2>
          <Error v-if="error"/>
          <form @submit.prevent="procesarFormulario">
            <div class="mb-3">
              <input 
                class="form-control" 
                type="email"
                placeholder="Email"
                v-model="email"
                required>
            </div>
            <div class="mb-4">
              <input 
                class="form-control" 
                type="password"
                placeholder="Contraseña"
                v-model="password"
                required>
              <div class="text-end">
                <RouterLink 
                  to="/recuperar-password">¿Olvidaste tu contraseña?</RouterLink>
              </div>
            </div>
            <BotonForm 
              texto="Ingresar"
              :carando="cargando"/>
            <div class="mt-3 text-center">
              <RouterLink 
                to="/registro">Registrate en la Web</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Error from '@/components/Error.vue';
import BotonForm from '@/components/BotonForm.vue'
import { mapActions, mapState } from 'pinia';
import { useErrorStore, useUsuarioStore } from '@/stores';
import { RouterLink } from 'vue-router';
import router from '@/router';

export default defineComponent({
  components:{
    Error,
    BotonForm
  },
  setup(){
    const email = ref('');
    const password = ref('');
    const cargando = ref(false);

    return{
      email,
      password,
      cargando,
    }
  },
  methods:{
    ...mapActions(useUsuarioStore,['login']),
    ...mapActions(useErrorStore,['resetarError']),
    async procesarFormulario(){
      this.cargando = true;
      this.resetarError();
      await this.login(this.email, this.password);
      if(!this.error){
        router.push('/cuentas');
      }
      this.cargando = false;
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