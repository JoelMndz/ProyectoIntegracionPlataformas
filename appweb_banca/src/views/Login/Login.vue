<template>
  <main>
    Login {{ API }}
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  setup(){
    
    
    return{
      API: import.meta.env.VITE_API_AUTH
    }
  },
  methods:{
    
  },
  computed:{
    
  }
})

</script>

