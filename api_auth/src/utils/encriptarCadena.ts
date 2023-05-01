import { genSalt, hash } from 'bcrypt'

export const encriptarCadena = async(cadena:string)=>{
  const salt = await genSalt(10);
  return await hash(cadena,salt);
}