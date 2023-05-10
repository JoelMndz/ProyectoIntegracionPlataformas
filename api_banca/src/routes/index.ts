import cuentaRouter from './cuenta'
import TransferenciaRouter from './transferencia'
import contactoRouter from './contacto'
import { cajeroRouter } from './cajero'


export const routes ={
    cuentaRouter:cuentaRouter,
    TransferenciaRouter:TransferenciaRouter,
    contactoRouter:contactoRouter,
    cajeroRouter
}