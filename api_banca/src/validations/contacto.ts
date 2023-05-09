import Joi from "joi";
import { mensajesDeError } from "./joiMensajes";

export const contactoValidation = {
  validacionRegistro: Joi.object({
    nombreCompleto: Joi.string().required(),
    numeroCuenta: Joi.string().required(),
    usuarioId: Joi.string().required(),
  }).messages(mensajesDeError),
};
