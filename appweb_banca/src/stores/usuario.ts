import { defineStore } from 'pinia';
import Axios from 'axios';
import { convetirABase64 } from '@/utils/convertirABase64';
import { useErrorStore } from './error';
import router from '@/router';

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
          localStorage.setItem('token',this.token!)
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

    async verificarToken(){
      try {
        const _token = localStorage.getItem('token');
        if(_token){
          const respuesta = await Axios({
            method:'PUT',
            url:`${API}/verificar-token`,
            headers:{
              token: _token
            }
          });
          this.usuarioActual = respuesta.data.usuario;
          this.token = respuesta.data.token;   
           
        }        
      } catch (error) {
        this.usuarioActual = null;
        this.token = null;
        localStorage.clear();
        console.log(error);      
      }
    },

    cerrarSesion(){
      this.usuarioActual = null;
      this.token = null;
      localStorage.clear();
      router.push('/');
    },

    async recuperarPassword(email:string){
      try {
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/recuperar-password`,
          method: 'POST',
          data: {
            email
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

    async cambiarPassword(cedula:string, pin:string, password:string){
      try {
        const errorStore = useErrorStore();
        await Axios({
          url: `${API}/cambiar-password`,
          method: 'PUT',
          data: {
            cedula,
            pin,
            password
          },
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
  },
})
