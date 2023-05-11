<template>
  <div class="container">
    <div class="row justify-content-center fila bg-light">
      <div class="col-10">
        <table class="table table-bordered">
          <thead>
            <tr class="table-warning">
              <th>Nombre</th>
              <th>Número de cuenta</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in contactos" :key="i._id">
              <td>{{ i.nombreCompleto }}</td>
              <td>{{ i.numeroCuenta }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="eliminar(i._id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import { useContactoStore } from "../../../stores";

export default defineComponent({
  setup() {},

  methods: {
    ...mapActions(useContactoStore, ["listarContactos", "eliminarContacto"]),

    async eliminar(id: string) {
      if (confirm("¿Seguro quieres eliminar el contacto?")) {
        await this.eliminarContacto(id);
      }
    },
  },

  async created() {
    await this.listarContactos();
  },

  computed: {
    ...mapState(useContactoStore, ["contactos"]),
  },
});
</script>

<style></style>
