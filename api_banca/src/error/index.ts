import {Response} from 'express'

export const manejarError = (res: Response, error: Error | any)=>{
  return res.status(error.status ?? 400)
    .json({
      ...error,
      mensaje: error.message ?? 'Error en el servidor',
    })
}