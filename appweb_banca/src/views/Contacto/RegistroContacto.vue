<template>
  <div class="row justify-content-center fila bg-light">
    <div class="mt-3 text-center">
      <FormContacto />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormContacto from "./components/FormContacto.vue";

export default defineComponent({
  components: {
    FormContacto,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
button {
  background: #ffdd00;
  color: #0f265c;
  width: 25%;
  height: 50px;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
}

button:hover {
  background: #ffd100;
}

button:disabled {
  background: #f0da77;
}
</style>
