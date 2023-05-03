import { Request, Response } from "express";
import { manejarError } from "../error";
import { CuentaService } from "../services";


export const CuentaController = {
  crear: async(req:Request, res:Response) =>{
    try {
      const {usuarioId} = req.query;
      const data = await CuentaService.crear({...req.body,usuarioId});
      return res.json(data);
    } catch (error:any) {
      manejarError(res,error);
    }
  }
};