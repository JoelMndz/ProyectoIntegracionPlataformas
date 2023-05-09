import { defineStore } from 'pinia';
import Axios from 'axios';
import { useErrorStore } from './error';
import { useUsuarioStore } from './usuario';


interface ITransferencia{
    numero:string,
    monto:number,
    tipo:string,
    nombreBeneficiario:string,
    cuentaBeneficiario:String,
    saldoDisponible: number,
    descripcion:string,
    email:string
}



interface IState{
    transferencias: ITransferencia[] ,
    nombreBeneficiario:string ,
}

const API = `${import.meta.env.VITE_API_BANCA}/api/transferencia`;

export const useTransferenciasStore = defineStore('transferencia', {
    state: ():IState=>{
        return{
            transferencias: [],
            nombreBeneficiario: '',
        }
    },
    actions:{
        async  enviarTransferencia(transferencia:any){
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
                        numero: transferencia.numero,
                        monto: transferencia.monto,
                        tipo: transferencia.tipo,
                        nombreBeneficiario: transferencia.nombreBeneficiario,
                        cuentaBeneficiario: transferencia.cuentaBeneficiario,
                        saldoDisponible: transferencia.saldoDisponible,
                        descripcion: transferencia.descripcion,
                        email: transferencia.email

                    }
                })
                .then((x:any)=>{
                console.log(x);          
                this.transferencias = [...this.transferencias,x];  
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

        async validarCuenta(numero:string){
            try {
                const errorStore = useErrorStore();
                const response =await Axios({
                url: `${API}/validar-cuenta`,
                method: 'PUT',
                data: {
                    numero: numero
                }
                })
                
                .then((x:any)=>{
                    console.log(x);          
                    this.nombreBeneficiario = x.data;  
                
                  })
                .catch((x:any)=>{
                if(x.code === 'ERR_NETWORK'){
                    errorStore.setError({mensaje:'Error en la Red'})
                }else{    
                    errorStore.setError(x.response?.data ?? null) 
                }
                });

                
            } catch (error) {
                console.log(error);
            }
        }
    }
})