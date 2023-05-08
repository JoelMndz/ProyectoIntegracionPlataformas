import { Schema, model } from "mongoose";

const contactoSchema = new Schema({
  nombreCompleto: String,
  numeroCuenta: String,
  usuarioId: {
    type: Schema.Types.ObjectId,
  },
  fechaCreacion:{
    type: Date,
    default: Date.now()
  },
});

export const ContactoModel = model("contactos", contactoSchema);
