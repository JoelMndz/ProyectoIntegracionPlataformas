import { Request } from "express";
import { manejarError } from "../error";
import { ContactoService } from "../services";

export const ContactoController = {
  registrar: async (req: Request, res: any) => {
    try {
      const { usuarioId } = req.query;
      const data = await ContactoService.registrar({
        ...req.body,
        usuarioId,
      });
      return res.json(data);
    } catch (error: any) {
      return manejarError(res, error);
    }
  },

  listar: async (req: Request, res: any) => {
    try {
      const contactos = await ContactoService.listar(req.query.usuarioId as string);
      return res.json(contactos);
    } catch (error: any) {
      return manejarError(res, error);
    }
  },

  eliminar: async (req: Request, res: any) => {
    try {
      const contacto = await ContactoService.eliminar(
        req.query.usuarioId as string,
        req.params.contactoId
      );
      return res.json(contacto);
    } catch (error: any) {
      return manejarError(res, error);
    }
  },
};
