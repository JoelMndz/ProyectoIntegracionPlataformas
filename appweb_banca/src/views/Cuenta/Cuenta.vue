<template>
  <div class="mt bg-light">
    <div class="col-2 justify-content-center">
      <FormCuenta />
    </div>
    <h2 class="text-center text-warning">Mis Productos</h2>
  </div>
  <br />

  <Card />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import FormCuenta from "./components/FormCuenta.vue";
import Card from "@/components/Card.vue";
import { useCuentaStore } from "@/stores/cuenta";

export default defineComponent({
  components: {
    FormCuenta,
    Card,
  },
  setup() {
    const cuentaStore = useCuentaStore();
    onMounted(async () => {
      await cuentaStore.getCuenta();
    });

    return {
      cuentas: cuentaStore.cuentas,
    };
  },
});
</script>

<style scoped></style>
