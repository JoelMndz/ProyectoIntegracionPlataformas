<template>
    <form @submit.prevent="procesarFormulario">
      <BotonForm texto="Agregar cuenta" :cargando="cargando" />
    </form>
</template>

<script lang="ts">
import BotonForm from "@/components/BotonForm.vue";
import { useCuentaStore } from "@/stores/cuenta";
import { mapActions } from "pinia";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    BotonForm,
  },
  setup() {
    const cargando = ref(false);

    return {
      cargando,
    };
  },
  methods: {
    ...mapActions(useCuentaStore, ["crearCuenta"]),
    async procesarFormulario() {
      if (confirm("¿Seguro quieres crear una cuenta?")) {
        this.cargando = true;
        await this.crearCuenta();
        this.cargando = false;
      }
    },
  },
});
</script>

<style scoped></style>
