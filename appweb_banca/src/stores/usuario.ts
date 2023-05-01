import { defineStore } from 'pinia';
import Axios, { AxiosError, type AxiosResponse } from 'axios';
import { convetirABase64 } from '@/utils/convertirABase64';
import { useErrorStore } from './error';

interface IUsuario{
  _id: String,
  nombres: String,
  apellidos: String,
  email: String
}

interface IState{
  usuarioActual: IUsuario | null,
  token: String | null,
}

const API = `${import.meta.env.VITE_API_AUTH}/api/usuario`
const errorStore = useErrorStore()

export const useUsuarioStore = defineStore('usuario', {
  //Aqui se definen las propiedades que trendrá este store
  state: ():IState => {
    return{
      usuarioActual: null,
      token: null,
    }
  },

  //Aqui defino las acciones
  actions:{
    async registro(usuario:any){
      try {
        const fotoBase64 = await convetirABase64(usuario.archivo);
        await Axios({
          url: API,
          method: 'POST',
          data: {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            password: usuario.password,
            cedula: usuario.cedula,
            fotoBase64
          }
        })
        .catch((x:AxiosError)=>{
          console.log('ErrorAxios',x.response?.data);       
          errorStore.setError(x.response?.data ?? null)   
        })
        
      } catch (error) {
        console.log('ERROR',error);        
      }
    }
  }
})