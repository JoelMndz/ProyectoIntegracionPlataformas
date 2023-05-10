import Axios from 'axios';
import { defineStore } from 'pinia';
import { useErrorStore } from './error';
import { useUsuarioStore } from './usuario';

interface ICuenta{
  _id: string,
  numero: string,
  titular: string,
  tipo: string,
  saldo: number,
  movimientos: any[]
}

interface IState{
  cuentas:ICuenta[],
  cuentaActual:ICuenta | null
}

const API = `${import.meta.env.VITE_API_BANCA}/api/cuenta`;

export const useCuentaStore = defineStore('cuenta', {
  state: ():IState=>{
    return{
      cuentas: [],
      cuentaActual: null
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
          this.cuentas = [...this.cuentas,x.data];  
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
    },
    async getCuenta(){
            
      try {
        const usuarioStore = useUsuarioStore();
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/listar-cuentas`,
          method: 'GET',
          headers:{
            token: usuarioStore.token
          }
        })
        .then((x:any)=>{
          console.log(x);          
          this.cuentas = x.data;  
        })
        .catch((x:any)=>{
          if(x.code === 'ERR_NETWORK'){
            errorStore.setError({mensaje:'Error en la Red'})
          }else{
            console.log('ErrorAxios',x.response?.data ?? x);       
            errorStore.setError(x.response?.data ?? null) 
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    setCuentaAcctual(cuenta:any){
      this.cuentaActual = cuenta
    }


  }
})