<template>
  <div class="container">
    
  
    <div class="row">
      <div class="div-1 col-2 ">
        <div class="form">
          <FormCuenta />
        </div>
        
      </div>
      <div class=" div-2 col-10 right">
        <h2 class="text">Mis Productos</h2>
        <h2 class="sub-text">Cuentas de ahorros</h2>
        <Card />
      </div>
    </div>
  </div>
</template> 

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import FormCuenta from "./components/FormCuenta.vue";
import Card from "@/components/Card.vue";
import { useCuentaStore } from "@/stores/cuenta";

export default defineComponent({
  components: {
    FormCuenta,
    Card,
  },
  setup() {
    const cuentaStore = useCuentaStore();
    onMounted(async () => {
      await cuentaStore.getCuenta();
    });

    return {
      cuentas: cuentaStore.cuentas,
    };
  },
});
</script>

<style scoped>
.text{
  color: #0f265c; 
  font-size: 30px;
  text-align: left; 
  margin-top: 50px;
  margin-left: 20px;
}
.sub-text{
  font-size: 20px;
  color:#122d6b;
  margin-left: 20px; 

}
.container{
  height: 100vh;
  margin-left: 0%;
  margin-right: 0%;
}
.div-1{
  border-right: 1px ridge rgb(205, 205, 205);
  background-color: white;
}
.form{
  margin-top: 50px;
  margin-left: 10px;
  width: 150px;
  height: 10px ;
}
</style>

