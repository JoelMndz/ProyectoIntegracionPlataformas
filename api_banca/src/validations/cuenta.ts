import Joi from 'joi';
import { mensajesDeError } from './joiMensajes';

export const cuentaValidation = {
  validacionCrear: Joi.object({
    titular: Joi
      .string()
      .required(),
    usuarioId: Joi
      .string()
      .required(),
  })
  .messages(mensajesDeError)
}
