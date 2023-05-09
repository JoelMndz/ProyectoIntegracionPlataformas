import {Request, Response} from 'express';
import { manejarError } from '../error';
import {transferenciaService} from '../services'

export const TransferenciaController ={
    validaCuenta: async(req:Request , res: Response)=>{
        try {
            const {numero} = req.body
            const nombreBeneficiario = await  transferenciaService.validarCuenta(numero);
            return res.json(nombreBeneficiario);
        } catch (error:any) {
            return manejarError(res,error);
        }
    },
    transferencia: async (req:Request,res:Response)=>{
        try {
            const {usuarioId} = req.query
            const nuevaTransferencia = await transferenciaService.transferencia({...req.body,usuarioId})
            return res.json(nuevaTransferencia);
        } catch (error:any) {
            return manejarError(res,error);
        }
    }

}