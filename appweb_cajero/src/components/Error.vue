<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>{{ error?.mensaje ?? 'N/A' }}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="restablecerError()"></button>
  </div>
</template>

<script lang="ts">

import { useContexto } from '@/stores/contexto';
import { mapActions, mapState } from 'pinia';
import {defineComponent} from 'vue';
  export default defineComponent({
    setup(){

      return{

      }
    },
    methods:{
      ...mapActions(useContexto, ['restablecerError']),
    },
    computed:{
      ...mapState(useContexto,['error']),
    }
  })

</script>



<style>

</style>