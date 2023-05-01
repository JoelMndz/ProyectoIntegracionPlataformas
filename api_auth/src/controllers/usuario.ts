import {Request, Response} from 'express';
import { manejarError } from '../error';
import { UsuarioService } from '../services';

export const UsuarioController = {
  registrar: async(req: Request, res: Response)=>{
    try {
      const usuarioNuevo = await UsuarioService.registrar(req.body);
      return res.json(usuarioNuevo);
    } catch (error:any) {
      return manejarError(res,error);
    }
  }
}