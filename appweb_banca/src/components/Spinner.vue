<template>
    <div class="spinners">
        <div class="spinner-grow spinner" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="mx-2 spinner-grow spinner" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow spinner" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    setup(){
        return{}
    }
});
</script>

<style scoped>
.spinner{
    color: #ffdd00;
}
.spinners{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999999;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.row{
    height: 100vh;
}
</style>