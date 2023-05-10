import { Router } from "express";

import { cajeroController } from "../controllers";

export const cajeroRouter = Router();

cajeroRouter.put("/deposito", cajeroController.depositar);
