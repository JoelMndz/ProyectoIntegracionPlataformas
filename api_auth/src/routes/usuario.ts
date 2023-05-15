import {Router} from 'express';
import { UsuarioController } from '../controllers';
import { verificarToken } from '../middlewares';

export const usuarioRouter = Router();

usuarioRouter.post('/registro', UsuarioController.registrar);

usuarioRouter.post('/login', UsuarioController.login);

usuarioRouter.put('/verificar-token',verificarToken, UsuarioController.buscarPorId);

usuarioRouter.post('/recuperar-password', UsuarioController.recuperarPassword);

usuarioRouter.put('/cambiar-password', UsuarioController.cambiarPassword);