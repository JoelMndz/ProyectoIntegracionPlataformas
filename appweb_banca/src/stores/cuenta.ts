import Axios from 'axios';
import { defineStore } from 'pinia';
import { useErrorStore } from './error';
import { useUsuarioStore } from './usuario';

interface ICuenta{
  numero: string,
  tipo: string,
  saldo: number,
  movimientos: any[]
}

interface IState{
  cuentas:ICuenta[]
}

const API = `${import.meta.env.VITE_API_BANCA}/api/cuenta`;

export const useCuentaStore = defineStore('cuenta', {
  state: ():IState=>{
    return{
      cuentas: []
    }
  },

  actions:{
    async crearCuenta(){
      try {
        const usuarioStore = useUsuarioStore();
        const errorStore = useErrorStore();
        await Axios({
          url: API,
          method: 'POST',
          headers:{
            token: usuarioStore.token
          },
          data: {
            titular: `${usuarioStore.usuarioActual?.nombres} ${usuarioStore.usuarioActual?.apellidos}`, 
          }
        })
        .then((x:any)=>{
          console.log(x);          
          this.cuentas = [...this.cuentas,x];  
        })
        .catch((x:any)=>{
          if(x.code === 'ERR_NETWORK'){
            errorStore.setError({mensaje:'Error en la Red'})
          }else{
            console.log('ErrorAxios',x.response?.data ?? x);       
            errorStore.setError(x.response?.data ?? null) 
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
})