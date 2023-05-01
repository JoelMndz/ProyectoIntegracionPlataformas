import {UsuarioModel} from '../models'
import { encriptarCadena, generarToken, subirImagen } from '../utils'
import { enviarEmail } from '../utils/enviarEmail'
import { UsuarioValidation } from '../validations'

interface IRequestRegistro{
  nombres: string,
  apellidos: string,
  cedula: string,
  email:string,
  password: string,
  fotoBase64: string
}

interface IRequestLogin{
  email: string,
  password: string
}

export const UsuarioService = {
  /**
   * Funcion para crear un usuario realiza las siguientes acciones:
   * - Validar información
   * - Registrar un usuario
   * - Envia por email un pin temporal para poder realizar operaciones en el cajero
   * 
   * @param entidad 
   */
  registrar: async(entidad:IRequestRegistro)=>{    
    const {error} = UsuarioValidation.validacionRegistro.validate(entidad)
    if(error){
      throw new Error(error.message);
    }

    const existeUsuario = await UsuarioModel.find({$or:[
      {
        email: entidad.email.trim().toLowerCase(),
      },
      {
        cedula: entidad.cedula.trim()
      }
    ]});

    if(existeUsuario.length > 0){
      if(existeUsuario[0].email === entidad.email.trim().toLowerCase()){
        throw new Error('El email ya está registrado!');
      }else{
        throw new Error('La cédula ya está registrada!');
      }
    }

    let pin = (Math.floor(Math.random() * 900000) + 100000).toString();
    await enviarEmail(
      entidad.email,
      `Pin: ${pin}`,
      "Banca Web PIN TEMPORAL");
    entidad.password = await encriptarCadena(entidad.password);
    pin = await encriptarCadena(pin);
    const fotoURL = await subirImagen(entidad.fotoBase64);
    const nuevoUsuario = await UsuarioModel.create({
      nombres: entidad.nombres.trim().toLowerCase(),
      apellidos: entidad.apellidos.trim().toLowerCase(),
      cedula: entidad.cedula.trim(),
      email: entidad.email.trim().toLowerCase(),
      password: entidad.password,
      pin,
      fotoURL
    })

    return nuevoUsuario;
  },

  async login(entidad:IRequestLogin){
    const usuario:any = await UsuarioModel.findOne({
      email:entidad.email
    })

    if(!usuario || !await usuario.compararPasswords(entidad.password)){
      throw new Error('Credenciales incorrectas!')
    }    

    const token = generarToken(usuario._id);
    return {usuario, token}
  }

}