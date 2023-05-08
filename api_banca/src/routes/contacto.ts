import { Router } from "express";

import { ContactoController } from "../controllers";
import { verificarToken } from "../middlewares";

export const contactoRouter = Router();

contactoRouter.use(verificarToken);

contactoRouter.post("/crear-contacto", ContactoController.registrar);
contactoRouter.get("/listar-contactos", ContactoController.listar);
contactoRouter.delete("/eliminar-contacto/:contactoId", ContactoController.eliminar);
