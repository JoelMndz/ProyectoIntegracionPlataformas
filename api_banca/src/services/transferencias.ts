import {CuentaModel} from '../models'
import { transferenciaValidation } from '../validations';

interface IrequestTransferencia{
    numero:string,
    monto:number,
    tipo:String,
    fecha:Date,
    nombreBeneficiario:string,
    cuentaBeneficiario:string,
    saldoDisponible: number,
    descripcion:string,
    email:string

    
}
export const transferenciaService = {
    transferencia: async(entidad:IrequestTransferencia)=>{
        const {error} = transferenciaValidation.validacionTrasnferir.validate({numero: entidad.numero,monto: entidad.monto,nombreBeneficiario: entidad.nombreBeneficiario,cuentaBeneficiario:entidad.cuentaBeneficiario, saldoDisponible: entidad.saldoDisponible, email: entidad.email});
        if(error){
            throw new Error(error.message);
        } 
        if(entidad.saldoDisponible < entidad.monto){
            throw new Error('Lo sentimos, no cuentas con dinero suficiente para realizar la transferencia!');
        }else{
            const cuentaBenef = await CuentaModel.findOne({ numero: entidad.cuentaBeneficiario });
            const cuentaPrincipal = await CuentaModel.findOne({ numero: entidad.numero });
            const now = Date.now();
            if (cuentaBenef) {
                const nuevoSaldo = (cuentaBenef.saldo) + (entidad.monto);
                
                const nuevoMovimiento = {
                    numero: entidad.numero,
                    monto: entidad.monto,
                    tipo:'deposito' as "deposito" | "retiro" | "transferencia",
                    fecha:new Date(now),
                    nombreBeneficiario: entidad.nombreBeneficiario,
                    cuentaBeneficiario: entidad.cuentaBeneficiario,
                    saldoDisponible: entidad.saldoDisponible,
                    descripcion:entidad.descripcion,
                    email:entidad.email
                    
                };
                await CuentaModel.findByIdAndUpdate(cuentaBenef.id,{saldo:nuevoSaldo}, { new: true });
                cuentaBenef.movimientos.push(nuevoMovimiento);
                await cuentaBenef.save(); 
            
            }
            if (cuentaPrincipal) {
                const nuevoSaldoPrin = cuentaPrincipal.saldo - (entidad.monto);
                const nuevoMovimientoTrans = {
                    numero: entidad.numero,
                    monto: entidad.monto,
                    tipo: 'transferencia'as "deposito" | "retiro" | "transferencia",
                    fecha:new Date(now),
                    nombreBeneficiario: entidad.nombreBeneficiario,
                    cuentaBeneficiario: entidad.cuentaBeneficiario,
                    saldoDisponible: entidad.saldoDisponible,
                    descripcion:entidad.descripcion,
                    email:entidad.email
                }
                await CuentaModel.findByIdAndUpdate(cuentaPrincipal.id,{saldo:nuevoSaldoPrin}, { new: true });
                cuentaPrincipal.movimientos.push(nuevoMovimientoTrans);
                await cuentaPrincipal.save(); 
                return nuevoMovimientoTrans
                
            }else{
                throw new Error('Lo sentimos a ocurrido un problema!');
            }

            
        }
        
    },
    validarCuenta:async(numero:string)=>{

        const exiteCuenta = await CuentaModel.find({numero});
        if(exiteCuenta.length > 0){
            const nombreBeneficiario = exiteCuenta[0].titular;
            return nombreBeneficiario
        }else{
            throw new Error('La cuenta no existe');
        }
    }
}
