import Joi from 'joi';
import { mensajesDeError } from './joiMensajes';

export const UsuarioValidation = {
  validacionRegistro: Joi.object({
    nombres: Joi.string()
      .custom((value,helpers)=>{
        if(!new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/).test(value)){
          return helpers.error('string.custom.nombreCompleto');
        }
        return value;
      })
      .required(),
    apellidos: Joi.string()
      .custom((value,helpers)=>{
        if(!new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/).test(value)){
          return helpers.error('string.custom.nombreCompleto');
        }
        return value;
      })
      .required(),
    cedula: Joi.string()
      .custom((value,helpers)=>{
        if(!new RegExp(/^\d{10}$/).test(value)){
          return helpers.error('string.custom.validarCedula'); 
        }
        return value;
      })
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fotoBase64: Joi.string()
      .custom((value, helpers)=>{
        if(!new RegExp(/^data:([a-z]+\/[a-z]+);base64,([a-zA-Z0-9+/]+={0,2})$/).test(value)){
          return helpers.error('string.custom.validarBase64');
        }
        return value;
      }).required(),
  })
  .messages(mensajesDeError)
}
