import {CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET} from '../config'
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
})

export const subirImagen = async(base64:string)=>{
  try {
    const respuesta = await cloudinary.uploader.upload(base64)
    return respuesta.url;
  } catch (error : any) {
    return null;
  }
}