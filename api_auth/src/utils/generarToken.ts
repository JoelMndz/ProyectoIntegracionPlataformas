import {sign} from 'jsonwebtoken'
import { SECRET } from '../config';


export const generarToken = (id:string)=>{
    const token = sign({
            id
        }, 
        SECRET!,{
            expiresIn: '7d'
        })
    return token;
}