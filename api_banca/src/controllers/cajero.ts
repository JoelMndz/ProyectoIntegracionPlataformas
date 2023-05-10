import {Request, Response} from 'express'
import { manejarError } from '../error'
import { CajeroService } from '../services';

export const cajeroController = {
  depositar: async(req:Request, res:Response)=>{
    try {
      const data =  await CajeroService.depositar(req.body);
      res.json(data)
    } catch (error: any) {
      return manejarError(res, error);
    }
  }
}