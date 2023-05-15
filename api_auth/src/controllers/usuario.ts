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
  },

  buscarPorId: async(req: Request, res: Response)=>{
    try {
      const data = await UsuarioService.buscarPorId(req.query.usuarioId as string);
      return res.json({usuario: data, token: req.headers.token});
    } catch (error:any) {
      return manejarError(res,error);
    }
  },

  recuperarPassword: async(req: Request, res: Response)=>{
    try {
      const data = await UsuarioService.recuperarPassword(req.body.email);
      return res.json(data);
    } catch (error:any) {
      return manejarError(res,error);
    }
  },

  cambiarPassword: async(req: Request, res: Response)=>{
    try {
      const data = await UsuarioService.cambiarPassword(req.body.cedula, req.body.pin, req.body.password);
      return res.json(data);
    } catch (error:any) {
      return manejarError(res,error);
    }
  },
}