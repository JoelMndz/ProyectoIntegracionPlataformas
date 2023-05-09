<template>
   <div class="container bg-light">
  <div class="row justify-content-around  " >
    <div class="col-sm-4" v-for="i in cuentas" :key="i._id">
      <div class="card" >
        <div class="card-body">
          <div class="row">
            <h6 class="card-title col-6">{{ i.titular }}</h6>
            <br>
            <h7 class="card-title col-6">{{ i.numero }}</h7>
          </div>
          <hr>
          <div class="row">
            <h5 class="card-title col-8">Cnt de {{ i.tipo }}</h5>
            <br>
            <h7 class="card-title col-4">${{ i.saldo }}</h7>
          </div>
          <br>
          <div class="btn w-50">
            <a class="btn btn-warning" @click="establecerCuenta(i)">Transferencia</a>

          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>    

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from "pinia";
import { useCuentaStore } from '@/stores/cuenta';
import router from '@/router';

export default defineComponent({
  setup() {},
  methods: {
    ...mapActions(useCuentaStore,["getCuenta","setCuentaAcctual"]),
    establecerCuenta(cuenta:any){
      this.setCuentaAcctual(cuenta)
      router.push('/transferencia')
    }

  },
  async created() {
    await this.getCuenta();
  },
  computed: {
    ...mapState(useCuentaStore, ["cuentas"]),
  },
});
</script>

<style scoped>
a{

background: #f0da77
}
</style>