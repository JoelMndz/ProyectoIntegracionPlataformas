<template>
  <nav class="navbar navbar-light bg-light">
    <h2 style="padding: 5px;">Banca WEB</h2>
    <RouterLink class="btn btn-outline-warning" to="/cuentas"
      >Cuentas</RouterLink
    >
    <RouterLink class="btn btn-outline-warning" to="/contactos"
      >Contactos</RouterLink
    >
    <div class="me-4">
      <strong>{{ nombreCompleto().toUpperCase() }}</strong>
      <button class="btn btn-danger mx-3" @click="cerrarSesion()">Salir</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { useUsuarioStore } from "@/stores";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  setup() {
    return {};
  },
  methods: {
    ...mapActions(useUsuarioStore, ["cerrarSesion"]),
    nombreCompleto() {
      return `${this.usuarioActual?.nombres} ${this.usuarioActual?.apellidos}`;
    },
  },
  computed: {
    ...mapState(useUsuarioStore, ["usuarioActual"]),
  },
});
</script>


<style>
.navbar{
  background-color: white;
  border-bottom: 1px solid rgb(205, 205, 205);
}
</style>
