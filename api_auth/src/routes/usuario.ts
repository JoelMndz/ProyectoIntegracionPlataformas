import {Router} from 'express';
import { UsuarioController } from '../controllers';

export const usuarioRouter = Router();

usuarioRouter.post('/registro', UsuarioController.registrar);

usuarioRouter.post('/login', UsuarioController.login);
