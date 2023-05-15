<template>
  <div class="row justify-content-center fila bg-light">
    <div class="col-12 p-5 d-flex justify-content-center align-items-center">
      <div class="card" style="width: 500px">
        <div class="card-body">
          <h2 class="text-center mb-4">Recupera tu contraseña</h2>
          <Error v-if="error" />
          <form @submit.prevent="procesarFormulario">
            <div class="mb-3">
              <input
                class="form-control"
                type="email"
                placeholder="Email"
                v-model="email"
                required
              />
            </div>
            <div class="text-end">
              <RouterLink to="/#">¿Recordaste tu contraseña?</RouterLink>
            </div>
            <br />
            <BotonForm texto="Enviar" :cargando="cargando" />
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
    const email = ref("");
    const cargando = ref(false);

    return {
      email,
      cargando,
    };
  },
  methods: {
    ...mapActions(useUsuarioStore, ["recuperarPassword"]),
    ...mapActions(useErrorStore, ["resetarError"]),
    async procesarFormulario() {
      this.cargando = true;
      this.resetarError();
      await this.recuperarPassword(this.email);
      this.cargando = false;
      this.$router.push("/cambiar-password");
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
