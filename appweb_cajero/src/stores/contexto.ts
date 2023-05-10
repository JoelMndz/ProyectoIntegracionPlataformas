import {defineStore} from 'pinia'
import Axios from 'axios'

interface IError{
  mensaje:string
}

interface IState{
  error: null | IError,
}

const API = `${import.meta.env.VITE_API_BANCA}/api/cajero/deposito`;

export const useContexto = defineStore('contexto',{
  state:():IState=>{
    return{
      error: null
    }
  },
  actions:{
    restablecerError(){
      this.error = null;
    },
    async depositar(deposito:any){
      try {        
        this.error = null;
        await Axios({
          method: 'PUT',
          url: API,
          data: deposito
        })
        .then(x => {
          console.log(x.data);
        })
        .catch(x =>{
          if(x.code === 'ERR_NETWORK'){
            this.error = {mensaje:'Error en la Red'}
          }else{    
            this.error = x.response?.data ?? null
          }
        })
      } catch (error) {
        console.log(error);        
      }
    }
  }
})