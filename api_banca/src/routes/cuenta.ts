import {Router} from 'express';

import {CuentaController} from '../controllers';
import { verificarToken } from '../middlewares';

export const cuentaRouter = Router();

// cuentaRouter.use(verificarToken);

cuentaRouter.post('/',CuentaController.crear,verificarToken);

cuentaRouter.get('/listar-cuentas', CuentaController.listarCuenta,verificarToken);

cuentaRouter.get('/movimientos', CuentaController.obtenerMovimientos);

export default cuentaRouter;
