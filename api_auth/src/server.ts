import express,{Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import {PORT} from './config';
import { conectarMongoDB } from './database';
import { usuarioRouter } from './routes';

export class Server{
  private app:Express;

  constructor(){
    this.app = express();

    conectarMongoDB();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json({limit:'15mb'}));
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  routes(){
    this.app.get('/', (req, res)=>{
      return res.json({
        api: 'API para la Authenticación'
      })
    })

    this.app.use('/api/usuario',usuarioRouter)
  }

  levantar(){
    this.app.listen(PORT, ()=>{
      console.log(`Servidor corriendo en el puerto ${PORT}`);      
    })
  }

}