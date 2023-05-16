<template>
   <div class="container ">
  <div class="row justify-content-around  " >
    <div class="card-mar col-sm-6" v-for="i in cuentas" :key="i._id">
      <div class="card" >
        <div class="card-body">
          <div class="d-flex justify-content-between">
            
            <div  class="card-name ">{{ i.titular.split(" ")[0].toUpperCase() }}</div>
            <div  class="card-number">{{ i.numero }}</div>
            <!-- <h6 class="card-title col-6">{{ i.titular }}</h6>
            <br> 
            <h7 class="card-title col-6">{{ i.numero }}</h7>-->
          </div>
          <hr class="my-line">
          <div class="d-flex justify-content-between">
            <div  class="card-sald ">Saldo Disponible :</div>
            <div  class="card-saldo">${{ i.saldo }}</div>
          </div>
          
          <br>
          <div >
            <button class="btn w-50" @click="establecerCuenta(i)">Transferencia</button>
            <!-- <a class="btn btn-warning" @click="establecerCuenta(i)">Transferencia</a> -->

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
.my-line {
    border: 1px solid gray;
    border-top: 3px solid #ffd100;
  }
.card{
  border-top-left-radius: 10px;
}
.card-saldo{
  color: #0f265c; 
  font-size: 25px; 
}
.card-sald{
  color: rgb(84, 84, 84); 
  font-size: 14px; 
}
.card-number{
  color: #444444; 
  font-size: 15px; 
}
button{
  background: #ffdd00; 
  color: #0f265c; 
  font-size: 14px; 
  padding-top: 10px;
  padding-bottom: 10px;
}
.card-mar{
  margin-top: 50px;
}

button:hover{
  background: #ffd100; 
}

button:disabled{
  background: #f0da77; 
}
</style>