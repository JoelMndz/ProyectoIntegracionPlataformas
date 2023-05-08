import express,{Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import {PORT} from './config';
import { conectarMongoDB } from './database';
import { cuentaRouter } from './routes/cuenta';
import { contactoRouter} from './routes/contacto';

export class Server{
  private app:Express;

  constructor(){
    this.app = express();

    conectarMongoDB();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  routes(){
    this.app.get('/', (req, res)=>{
      return res.json({
        api: 'API para la Authenticación'
      })
    })

    this.app.use('/api/cuenta', cuentaRouter);
    this.app.use('/api/contacto', contactoRouter);
  }

  levantar(){
    this.app.listen(PORT, ()=>{
      console.log(`Servidor corriendo en el puerto ${PORT}`);      
    })
  }

}