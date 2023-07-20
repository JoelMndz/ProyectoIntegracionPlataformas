import {config} from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
  config();
}

export const PORT = process.env.PORT || 5002;
export const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.9p5wrdm.mongodb.net/api_banca_db?retryWrites=true&w=majority';
// export const MONGO_URI = process.env.MONGO_URI;

export const SECRET = process.env.SECRET;
// export const EMAIL_USER = process.env.EMAIL_USER;
// export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;