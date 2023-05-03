import {CuentaModel} from '../models';
import { cuentaValidation } from '../validations';

interface IRequestCrear{
  titular: string,
  usuarioId: string,
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
  }
};