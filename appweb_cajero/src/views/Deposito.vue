<template>
  <div class="row contenedor justify-content-center fila bg-light">
    <div class="col-12 p-5 d-flex justify-content-center align-items-center">
      <div style="width: 450px;" class="card">
        <h1 class="text-center">Cajero online</h1>
        <h5 class="text-center">Depósitos</h5>
        <Error v-if="error"/>
        <form @submit.prevent="procesarFormulario()" class="card-body">
          <input 
            step="10" 
            type="number"
            min="10"
            max="500"
            placeholder="Ingrese el monto"
            class="form-control mb-2"
            v-model="datos.cantidad"
            required>

          <input 
            type="text"
            class="form-control mb-2"
            placeholder="Ingrese el numero de cuenta"
            v-model="datos.numeroCuenta"
            required>

            <input 
            type="text"
            class="form-control mb-2"
            placeholder="Ingrese su nombre completo"
            v-model="datos.nombreBeneficiario"
            required>
            <BotonForm class="mt-3" texto="Depositar" :cargando="cargando"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import BotonForm from '../components/BotonForm.vue'
import { mapActions, mapState } from 'pinia';
import {useContexto} from '../stores/contexto'
import Error from '@/components/Error.vue';

export default defineComponent({
  components:{
    BotonForm,
    Error,
},
  setup(){
    const cargando = ref(false);
    const datos = reactive({
      numeroCuenta: '',
      cantidad: '',
      nombreBeneficiario: '',
    })
    return{
      cargando,
      datos,
    }
  },
  methods:{
    ...mapActions(useContexto,['depositar']),
    async procesarFormulario(){
      this.cargando = true;
      await this.depositar(this.datos)
      this.cargando = false;
      if(!this.error){
        alert('Deposito realizado con exito!')
        this.datos.cantidad = '';
        this.datos.nombreBeneficiario = '';
        this.datos.numeroCuenta = '';
      }
    }
  },
  computed:{
    ...mapState(useContexto,['error']),
  }
})
</script>

<style>
.contenedor{
  height: 100vh;
}
</style>