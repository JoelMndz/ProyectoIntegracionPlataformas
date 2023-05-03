import { defineStore } from 'pinia';
import Axios from 'axios';
import { convetirABase64 } from '@/utils/convertirABase64';
import { useErrorStore } from './error';

interface IUsuario{
  _id: String,
  nombres: String,
  apellidos: String,
  email: String,
  fotoURL: String,
  cedula: String,
}

interface IState{
  usuarioActual: IUsuario | null,
  token: string | null,
}

const API = `${import.meta.env.VITE_API_AUTH}/api/usuario`

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
        const errorStore = useErrorStore();
        const fotoBase64 = await convetirABase64(usuario.archivo);
        await Axios({
          url: `${API}/registro`,
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
        .catch((x:any)=>{
          if(x.code === 'ERR_NETWORK'){
            errorStore.setError({mensaje:'Error en la Red'})
          }else{    
            errorStore.setError(x.response?.data ?? null) 
          }
        })
        
      } catch (error) {
        console.log('ERROR',error);        
      }
    },

    async login(email:string, password:string){
      try {
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/login`,
          method: 'POST',
          data: {
            email, 
            password
          }
        })
        .then((x:any)=>{
          this.usuarioActual = x.data?.usuario ?? null;    
          this.token = x.data?.token;   
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
  },

})
