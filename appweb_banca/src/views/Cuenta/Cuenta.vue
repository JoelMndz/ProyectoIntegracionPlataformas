<template>
  <div class="row justify-content-center fila bg-light">
    <div class="col-2">
      <FormCuenta />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FormCuenta from './components/FormCuenta.vue';


export default defineComponent({
  components:{
    FormCuenta
  },
  setup(){

    return{

    }
  },
})

</script>

<style scoped>

</style>