<template>
  <div class="container">
    <div class="row justify-content-around">
      <div class="col-sm-6">
        <br>
        <div class="card border-left-1">
          <div class="row">
            <h2 class="text-sec">TRANSACCIONAL ELECTRONICA</h2> 
          </div>
          <div class="row">
            <div class="d-flex justify-content-between">
              <div  class="card-numero">{{ cuentaActual?.numero  }}</div>
              <div  class="card-saldo">${{ cuentaActual?.saldo  }}</div>              
            </div>
          </div>
        </div>
        <br>
        <div class="card border-left-1">
          <div class="card-body">
            <Error v-if="error" />
            <form @submit.prevent="procesarFormulario">
              <div class="mt-4">
                <h6 class="text-label text-right">Monto</h6>
              </div>
              <div class="mb-4">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Monto"
                  v-model="transferencia.monto"
                  required
                />
              </div>
              <div class="mt-4">
                <h6 class="text-label text-right">Beneficiario</h6>
              </div>              
              <div class="d-flex justify-content-between mb-2">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Numero de Cuenta"
                  name="cuentaBeneficiario"
                  v-model="transferencia.cuentaBeneficiario"
                  required
                />
                <button
                  @click="validar(transferencia.cuentaBeneficiario)"
                  class="btn btn-warning border-left-0"
                  >Validar</button
                >
              </div>
              <br />
              <div class="d-flex justify-content-between mb-2">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Nombre del Beneficiario"
                  v-model="nombreBeneficiario"
                  required
                />
                <RouterLink
                  class="btn btn-warning border-left-0"
                  to="/registro-contacto"
                  >Registrar</RouterLink
                >
              </div>
              <div class="mt-4">
                <h6 class="text-label text-right">Descripcion</h6>
              </div>
              <div class="mb-4">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Descripcion"
                  v-model="transferencia.descripcion"
                  required
                />
              </div>
              <div class="mt-4">
                <h6 class="text-label text-right">Email</h6>
              </div>
              <div class="mb-4">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Email"
                  v-model="transferencia.email"
                  required
                />
              </div>
              <div class="mt-4 align-items-center">
                <BotonForm texto="Transferir" :cargando="cargando" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  useTransferenciasStore,
  useErrorStore,
  useCuentaStore,
} from "@/stores";
import { mapActions, mapState } from "pinia";
import { defineComponent, reactive, ref } from "vue";
import Error from "@/components/Error.vue";
import router from "@/router";
import BotonForm from "@/components/BotonForm.vue";
export default defineComponent({
  components: { Error, BotonForm },
  setup() {
    const transferencia = reactive({
      numero: "",
      monto: 0,
      tipo: "",
      nombreBeneficiario: "",
      cuentaBeneficiario: "",
      saldoDisponible: 0,
      descripcion: "",
      email: "",
    });
    const cargando = ref(false);

    return {
      transferencia,
      cargando,
    };
  },
  methods: {
    ...mapActions(useTransferenciasStore, ["validarCuenta"]),
    ...mapActions(useTransferenciasStore, ["enviarTransferencia"]),
    ...mapActions(useErrorStore, ["resetarError"]),

    async procesarFormulario() {
      this.cargando = true;
      this.resetarError();
      this.transferencia.numero = this.cuentaActual
        ? this.cuentaActual.numero
        : "";
      this.transferencia.nombreBeneficiario = this.nombreBeneficiario;
      this.transferencia.saldoDisponible = this.cuentaActual
        ? this.cuentaActual.saldo
        : 0;
      await this.enviarTransferencia(this.transferencia);
      if (!this.error) {
        router.push("/transferencia");
        (this.transferencia.saldoDisponible = this.cuentaActual
          ? this.cuentaActual.saldo
          : 0),
          (this.transferencia.monto = 0),
          (this.transferencia.tipo = ""),
          (this.transferencia.nombreBeneficiario = ""),
          (this.transferencia.cuentaBeneficiario = ""),
          (this.transferencia.descripcion = ""),
          (this.transferencia.email = ""),
          (this.nombreBeneficiario = "");
      }
      this.cargando = false;
    },
    async validar(cuenta: string) {
      await this.validarCuenta(cuenta);
    },
    modificarTransferencia() {
      this.transferencia.numero = this.cuentaActual
        ? this.cuentaActual.numero
        : "";
    },
  },
  computed: {
    ...mapState(useErrorStore, ["error"]),
    ...mapState(useCuentaStore, ["cuentaActual"]),
    ...mapState(useTransferenciasStore, ["nombreBeneficiario"]),
  },
});
</script>

<style scoped>
a {
  background: #f0da77;
}
.btn{
  background: #ffd100; 
  font-size: 15px;
  color: #0f265c;
}
.card{
  border-bottom-left-radius: 1px;
  border-top-right-radius: 1px;
}
.row{
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
.card-saldo{
  color: #0f265c; 
  font-size: 25px; 
}
.card-numero{
  color: #444444; 
  font-size: 17px; 
}
.text-sec{
 font-size: 18px;
 color: #0f265c;
}
.text-label{
  font-size: 17px;
 color: #0f265c;
}
</style>
