import {Router} from 'express';

import {CuentaController} from '../controllers';
import { verificarToken } from '../middlewares';

export const cuentaRouter = Router();

cuentaRouter.use(verificarToken);

cuentaRouter.post('/',CuentaController.crear);

cuentaRouter.get('/listar-cuentas', CuentaController.listarCuenta);
export default cuentaRouter;
