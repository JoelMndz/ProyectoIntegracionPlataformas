import jwt from 'jsonwebtoken';

import { SECRET } from '../config';
import { NextFunction, Request, Response } from 'express';
import { manejarError } from '../error';


export const verificarToken = async(req:Request, res:Response, next:NextFunction)=>{
    try {
      const token:string = req.headers['token'] as string;

      if(!token){
        const error:any = new Error('No ha enviado el token');
        error.status = 401;
        return manejarError(res,error);
      }

      const decodificado:any = jwt.verify(token!, SECRET!);
      
      req.query.usuarioId = decodificado.id;
      next();
    } catch (error:any) {
      return manejarError(res,new Error('Token inválido o expirado!'));
    }
}