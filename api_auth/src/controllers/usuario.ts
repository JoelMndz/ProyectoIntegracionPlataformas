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
  },

  login: async(req: Request, res: Response)=>{
    try {
      const data = await UsuarioService.login(req.body);
      return res.json(data);
    } catch (error:any) {
      return manejarError(res,error);
    }
  }
}