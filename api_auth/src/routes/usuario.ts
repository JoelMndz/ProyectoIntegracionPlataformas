import {Router} from 'express';
import { UsuarioController } from '../controllers';

export const usuarioRouter = Router();

usuarioRouter.post('/', UsuarioController.registrar);

