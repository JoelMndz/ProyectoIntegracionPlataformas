<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>{{ error?.mensaje ?? 'N/A' }}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="resetarError()"></button>
  </div>
</template>

<script lang="ts">

  import { useErrorStore } from '@/stores';
import { mapActions, mapState } from 'pinia';
import {defineComponent} from 'vue';
  export default defineComponent({
    setup(){

      return{

      }
    },
    methods:{
      ...mapActions(useErrorStore, ['resetarError']),
    },
    computed:{
      ...mapState(useErrorStore,['error']),
    }
  })

</script>



<style>

</style>