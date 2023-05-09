<template>
  
    <div class="mt-4 ">
    <!-- Aqui se deben mostrar las cuentas que tengan asociada el usuario -->
        <h2 class="text-center  text-warning">Transferencia de Dinero</h2>
        
    </div>    
    <br>
    <div class="container">
        <div class="row justify-content-around" >
            <div class="col-sm-6">
                <div class="card border-left-1">
                    <div class="card-body">
                        <div class="row">
                        <h7 class="card-title text-secondary col-8">Cnt de {{ cuentaActual?.tipo }} :  {{ cuentaActual?.numero }}</h7>
                        <br>
                        <h7 class="card-title  text-secondary col-4">    Saldo: {{ cuentaActual?.saldo }}</h7>
                    </div>
                    <hr>
                    <Error v-if="error"/>
                    <form @submit.prevent="procesarFormulario">
                        <div class="mt-4">
                            <h6 class="text-right ">Monto</h6>
                        </div>
                        <div class="mb-4">
                            <input 
                            class="form-control" 
                            type="number"
                            placeholder="Monto"
                            v-model="transferencia.monto"
                            required>
                        </div> 
                        <div class="mt-4">
                            <h6 class="text-right ">Beneficiario</h6>
                        </div>
                        <!-- <div class="mt-4">
                            <label for="nombre"> Nombre:{{ nombreBeneficiario}}</label>
                            <h6 class="text-right ">nombre : {{ transferencia.nombreBeneficiario }}</h6>
                        </div> -->
                        
                        <div class="d-flex justify-content-between mb-2">
                            <input 
                            class="form-control" 
                            type="text"
                            placeholder="Numero de Cuenta"
                            name="cuentaBeneficiario"
                            v-model="transferencia.cuentaBeneficiario"
                            required>
                            <a href="#" @click="validar(transferencia.cuentaBeneficiario)" class="btn btn-warning text-secondary border-left-0">Validar</a>
                        </div>
                        <br>
                        <div class="mb-4">
                            <input 
                            class="form-control" 
                            type="text"
                            placeholder="Nombre del Beneficiario"
                            v-model="nombreBeneficiario"
                            required>
                            
                            
                        </div>
                        <div class="mt-4">
                            <h6 class="text-right ">Descripcion</h6>
                        </div>
                        <div class="mb-4">
                            <input 
                            class="form-control" 
                            type="text"
                            placeholder="Descripcion"
                            v-model="transferencia.descripcion"
                            required>
                            
                            
                        </div>
                        <div class="mt-4">
                            <h6 class="text-right ">Email</h6>
                        </div>
                        <div class="mb-4">
                            <input 
                            class="form-control" 
                            type="text"
                            placeholder="Email"
                            v-model="transferencia.email"
                            required>
                            
                            
                        </div>
                        <div class="mt-4 align-items-center">
                          <BotonForm 
                            texto="Transferir"
                            :cargando="cargando"/>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</div>
      
    
</template>
  
<script lang="ts">
import { useTransferenciasStore, useErrorStore ,useCuentaStore} from '@/stores';
import { mapActions, mapState } from 'pinia';
import {defineComponent, reactive, ref} from 'vue';
import Error from '@/components/Error.vue';
import router from '@/router';
import BotonForm from '@/components/BotonForm.vue'
export default defineComponent({
  components:{ Error, BotonForm },
  setup(){
    const transferencia = reactive({
      numero: '',
      monto: 0,
      tipo:'',
      nombreBeneficiario:'',
      cuentaBeneficiario:'',
      saldoDisponible: 0,
      descripcion:'',
      email:''
      
    });
    const cargando = ref(false);
    
    
    
    return{
      transferencia,
      cargando
      
    }
  },
  methods:{
    ...mapActions(useTransferenciasStore,["validarCuenta"]),
    ...mapActions(useTransferenciasStore,["enviarTransferencia"]),
    ...mapActions(useErrorStore,['resetarError']),
    
    async  procesarFormulario(){
      this.cargando= true;
      this.resetarError();
      this.transferencia.numero = (this.cuentaActual? this.cuentaActual.numero: '');
      this.transferencia.nombreBeneficiario= this.nombreBeneficiario;
      this.transferencia.saldoDisponible = (this.cuentaActual? this.cuentaActual.saldo: 0);
      await this.enviarTransferencia(this.transferencia);
      if (!this.error) {
        router.push("/transferencia");
        this.transferencia.saldoDisponible= (this.cuentaActual? this.cuentaActual.saldo: 0),
        this.transferencia.monto =  0,
        this.transferencia.tipo ='',
        this.transferencia.nombreBeneficiario='',
        this.transferencia.cuentaBeneficiario='',
        this.transferencia.descripcion='',
        this.transferencia.email=''
      }
      this.cargando=false;

    },
    async validar(cuenta: string){
         await this.validarCuenta(cuenta);
      
    },
    modificarTransferencia(){
      this.transferencia.numero = (this.cuentaActual? this.cuentaActual.numero: '');
    },

  },
  computed: {
    ...mapState(useErrorStore, ["error"]),
    ...mapState(useCuentaStore,["cuentaActual"]),
    ...mapState(useTransferenciasStore,["nombreBeneficiario"])
  },
});
  </script>

<style scoped>  
a{

    background: #f0da77
}
</style>