import { CuentaModel } from "../models"

interface IRequestDeposito{
  numeroCuenta: string,
  cantidad: number,
  nombreBeneficiario: string,
}

export const CajeroService = {
  depositar: async(entidad:IRequestDeposito)=>{
    const existeCuenta = await CuentaModel.findOne({numero:entidad.numeroCuenta});
    if(!existeCuenta){
      throw new Error('La cuenta no existe!');
    }
    if(!entidad.cantidad && entidad.cantidad <= 0){
      throw new Error('El monto debe ser mayor a 0!');
    }
    existeCuenta.saldo += entidad.cantidad;
    existeCuenta.movimientos.push({
      fecha: new Date(),
      monto: entidad.cantidad,
      tipo: 'deposito',
      saldoDisponible: existeCuenta.saldo
    })
    return entidad;
  }
}