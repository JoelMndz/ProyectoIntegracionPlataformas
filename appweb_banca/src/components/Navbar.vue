<template>
  <nav class="navbar navbar-light bg-light">
    <span class="navbar-brand"> Banca WEB </span>
    <RouterLink class="btn btn-outline-warning" to="/contactos"
      >Contactos</RouterLink
    >
    <RouterLink class="btn btn-outline-warning" to="/cuentas"
      >Cuentas</RouterLink
    >
    <div class="me-4">
      <span>{{ nombreCompleto() }}</span>
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

<style></style>
