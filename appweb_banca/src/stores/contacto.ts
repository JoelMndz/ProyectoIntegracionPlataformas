import Axios from "axios";
import { defineStore } from "pinia";
import { useErrorStore } from "./error";
import { useUsuarioStore } from "./usuario";

interface IContacto {
  _id: string;
  nombreCompleto: string;
  numeroCuenta: string;
}

interface IState {
  contactos: IContacto[]
}

const API = `${import.meta.env.VITE_API_BANCA}/api/contacto`;

export const useContactoStore = defineStore("contacto", {
  state: (): IState => {
    return {
      contactos: [],
    };
  },

  actions: {
    async crearContacto(contacto: any) {
      try {
        const usuarioStore = useUsuarioStore();
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/crear-contacto`,
          method: "POST",
          headers: {
            token: usuarioStore.token
          },
          data: {
            nombreCompleto: contacto.nombreCompleto,
            numeroCuenta: contacto.numeroCuenta,
          },
        })
          .then((x: any) => {
            console.log(x);
            this.contactos = [...this.contactos, x];
          })
          .catch((x: any) => {
            if (x.code === "ERR_NETWORK") {
              errorStore.setError({ mensaje: "Error en la Red" });
            } else {
              console.log("ErrorAxios", x.response?.data ?? x);
              errorStore.setError(x.response?.data ?? null);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },

    async listarContactos() {
      try {
        const usuarioStore = useUsuarioStore();
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/listar-contactos`,
          method: "GET",
          headers: {
            token: usuarioStore.token,
          },
        })
          .then((x: any) => {
            console.log(x);
            this.contactos = x.data;
          })
          .catch((x: any) => {
            if (x.code === "ERR_NETWORK") {
              errorStore.setError({ mensaje: "Error en la Red" });
            } else {
              console.log("ErrorAxios", x.response?.data ?? x);
              errorStore.setError(x.response?.data ?? null);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },

    async eliminarContacto(contactoId: string) {
      try {
        const usuarioStore = useUsuarioStore();
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/eliminar-contacto/${contactoId}`,
          method: "DELETE",
          headers: {
            token: usuarioStore.token,
          },
        })
          .then((x: any) => {
            console.log(x);
            this.contactos = this.contactos.filter(
              (contacto) => contacto._id !== contactoId
            );
          })
          .catch((x: any) => {
            if (x.code === "ERR_NETWORK") {
              errorStore.setError({ mensaje: "Error en la Red" });
            } else {
              console.log("ErrorAxios", x.response?.data ?? x);
              errorStore.setError(x.response?.data ?? null);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
});
