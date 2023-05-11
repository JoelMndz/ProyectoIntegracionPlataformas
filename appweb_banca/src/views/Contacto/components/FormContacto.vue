<template>
  <div class="row justify-content-center fila bg-light">
    <div class="col-12 p-5 d-flex justify-content-center align-items-center">
      <div class="card" style="width: 500px">
        <div class="card-body">
          <h2 class="text-center mb-4">Registrar un contacto</h2>
          <Error v-if="error" />
          <form @submit.prevent="procesarFormulario">
            <div class="mb-2">
              <div class="col-auto">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Nombre Completo"
                  v-model="contacto.nombreCompleto"
                  required
                />
              </div>
            </div>
            <div class="mb-2">
              <input
                class="form-control"
                type="text"
                placeholder="Numero de cuenta"
                v-model="contacto.numeroCuenta"
                required
              />
            </div>
            <BotonForm texto="Registrar" :cargando="cargando" />
            <div class="mt-3 text-center">
              <RouterLink to="/contactos">Lista de contactos</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useContactoStore, useErrorStore } from "@/stores";
import { mapActions, mapState } from "pinia";
import { defineComponent, reactive, ref } from "vue";
import Error from "@/components/Error.vue";
import router from "@/router";
import BotonForm from "@/components/BotonForm.vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  components: { Error, BotonForm, RouterLink },
  setup() {
    const contacto = reactive({
      nombreCompleto: "",
      numeroCuenta: "",
    });

    const cargando = ref(false);

    return {
      contacto,
      cargando,
    };
  },

  methods: {
    ...mapActions(useContactoStore, ["crearContacto"]),
    ...mapActions(useErrorStore, ["resetarError"]),
    async procesarFormulario() {
      this.cargando = true;
      this.resetarError();
      await this.crearContacto(this.contacto);
      this.cargando = false;
      this.cargando = false;
      this.$router.push("/contactos");
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
