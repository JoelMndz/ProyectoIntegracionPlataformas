import Joi from "joi";
import { mensajesDeError } from "./joiMensajes";

export const transferenciaValidation = {
  validacionTrasnferir: Joi.object({
    numero: Joi.string().required(),
    monto: Joi.number().required(),
    nombreBeneficiario: Joi.string().required(),
    cuentaBeneficiario: Joi.string().required(),
    saldoDisponible: Joi.number().required(),
    descripcion: Joi.string(),
    email:Joi.string().email(),
  }).messages(mensajesDeError),
};