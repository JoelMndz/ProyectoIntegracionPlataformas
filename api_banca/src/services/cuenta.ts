import {CuentaModel} from '../models';
import { cuentaValidation } from '../validations';

interface IRequestCrear{
  titular: string,
  usuarioId: string,
}

interface IFiltrosMovimientos {
  usuarioId?: string;
  tipo?: string;
  numero?:string;
  fechaInicio?: string;
  fechaFin?: string;
}

export const CuentaService = {
  crear: async(entidad:IRequestCrear)=>{
    
    const {error} = cuentaValidation.validacionCrear.validate(entidad);
    if(error){
      throw new Error(error.message);
    }    

    const cuentaNueva = await CuentaModel.create({
      numero: Date.now().toString(),
      titular: entidad.titular,
      usuarioId: entidad.usuarioId,
    })
    return cuentaNueva;
  },
  listarCuenta: async(usuarioId:string)=>{
    const cuenta = await CuentaModel.find({usuarioId});
    return cuenta;
  },
  obtenerMovimientos: async(filtros: IFiltrosMovimientos)=>{
    try {
      if(filtros){
        const movimientos = await CuentaService.consultarMovimientos(filtros);
        return movimientos;
      }
    } catch (error) {
      throw new Error('Error al obtener los movimientos');
    }
  },
  consultarMovimientos: async(filtros: IFiltrosMovimientos)=> {
    const { usuarioId, tipo, numero, fechaInicio, fechaFin } = filtros;

    const filters: any = {};

    if (usuarioId) {
      filters.usuarioId = usuarioId;
    }

    if (numero) {
      filters.numero = numero;
    }

    if (tipo) {
      filters['movimientos.tipo'] = tipo;
    }

    if (fechaInicio && fechaFin) {
      filters['movimientos.fecha'] = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) };
    }

    const movimientos = await CuentaModel.find(filters).populate('movimientos');
    return movimientos;
  }
};