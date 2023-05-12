<template>
  <div class="row justify-content-center fila bg-light">
    <div class="col-12 p-5 d-flex justify-content-center align-items-center">
      <div class="card" style="width: 500px">
        <div class="card-body">
          <h2 class="text-center mb-4">Actualiza tu contraseña</h2>
          <Error v-if="error" />
          <form @submit.prevent="procesarFormulario">
            <div class="mb-4">
              <input
                class="form-control"
                type="text"
                placeholder="cedula"
                v-model="cedula"
                required
              />
            </div>
            <div class="mb-4">
              <input
                class="form-control"
                type="password"
                placeholder="pin"
                v-model="pin"
                required
              />
            </div>
            <div class="mb-4">
              <input
                class="form-control"
                type="password"
                placeholder="Contraseña"
                v-model="password"
                required
              />
            </div>
            <br />
            <BotonForm texto="Actualiza" :cargando="cargando" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Error from "@/components/Error.vue";
import BotonForm from "@/components/BotonForm.vue";
import { mapActions, mapState } from "pinia";
import { useErrorStore, useUsuarioStore } from "@/stores";
import { RouterLink } from "vue-router";
import router from "@/router";

export default defineComponent({
  components: {
    Error,
    BotonForm,
    RouterLink,
  },
  setup() {
    const cedula = ref("");
    const pin = ref("");
    const password = ref("");
    const cargando = ref(false);

    return {
      cedula,
      pin,
      password,
      cargando,
    };
  },
  methods: {
    ...mapActions(useUsuarioStore, ["cambiarPassword"]),
    ...mapActions(useErrorStore, ["resetarError"]),
    async procesarFormulario() {
      this.cargando = true;
      this.resetarError();
      await this.cambiarPassword(this.cedula, this.pin, this.password);
      this.cargando = false;
      this.$router.push("/#");
    },
  },
  computed: {
    ...mapState(useErrorStore, ["error"]),
  },
});
</script>

<style scoped>
a {
  color: #2f7abf;
  font-size: 14px;
}
</style>
