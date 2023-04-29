import {Schema, model} from 'mongoose';

const usuarioSchema = new Schema({
  nombres: String,
  apellidos: String,
  cedula: String,
  rol:{
    type: String,
    default: 'user'
  },
  email: String,
  password: String,
  pin: String,
  fotoURL: String,
  fechaCreacion:{
    type: Date,
    default: Date.now()
  },
  fechaModificacion:{
    type: Date,
    default: Date.now()
  }
});

export const UsuarioModel = model('usuarios',usuarioSchema);