// movimientos.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Filtro } from './entities/filtros.entity';



@Injectable()
export class CuentasService {
  async consultarMovimientos(filtros: Filtro) {
    const { usuarioId, tipo, numero, fechaInicio, fechaFin } = filtros;

    // const filters: any = {};

    

    // if (usuarioId) {
    //   filters.usuarioId = usuarioId;
    // }

    // if (numero) {
    //   filters.numero = numero;
    // }

    // if (tipo) {
    //   filters['movimientos.tipo'] = tipo;
    // }

    // if (fechaInicio && fechaFin) {
    //   filters['movimientos.fecha'] = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) };
    // }

  const queryParams = new URLSearchParams(); // Creamos un objeto para los parámetros de consulta

  if (usuarioId) {
    queryParams.append('usuarioId', usuarioId);
  }

  if (numero) {
    queryParams.append('numero', numero);
  }

  if (tipo) {
    queryParams.append('tipo', tipo);
  }

  if (fechaInicio && fechaFin) {
    queryParams.append('fechaInicio', fechaInicio);
    queryParams.append('fechaFin', fechaFin);
  }
  const url = `http://localhost:5002/api/cuenta/movimientos?${queryParams.toString()}`;

    // const response = await axios.get('http://localhost:5002/api/cuenta/movimientos');
    const { data } = await axios.get(url);
    return data;
  }
}

