import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt'

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
  claveTemporal: {
    type: String,
    default: null
  },
  pin: {
    type: String,
    default: null
  },
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

usuarioSchema.methods.compararPasswords = function(password:string){
  return bcrypt.compare(password, this.password);
};

usuarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.pin;
  delete obj.claveTemporal;
  delete obj.__v;
  return obj;
};

export const UsuarioModel = model('usuarios',usuarioSchema);