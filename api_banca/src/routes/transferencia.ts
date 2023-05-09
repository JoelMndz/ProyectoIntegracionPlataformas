import {Router} from 'express'
import {TransferenciaController} from '../controllers'
// import { verificarToken } from '../middlewares';

export const TransferenciaRouter = Router();

// cuentaRouter.use(verificarToken);
TransferenciaRouter.put('/validar-cuenta', TransferenciaController.validaCuenta);
TransferenciaRouter.post('/', TransferenciaController.transferencia);

export default TransferenciaRouter;