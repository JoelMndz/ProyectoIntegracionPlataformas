<template>
  <div class="row justify-content-center fila bg-light">
    <h2 class="text-center text-warning">Contactos</h2>
    <div class="mt-3 text-center">
      <RouterLink class="btn btn-outline-warning" to="/registro-contacto"
        >Registrar contacto</RouterLink
      >
    </div>
    <div class="mt-3 text-center">
      <ListContacto />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListContacto from "./components/ListContacto.vue";

export default defineComponent({
  components: {
    ListContacto,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
