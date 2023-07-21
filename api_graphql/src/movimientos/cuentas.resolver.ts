// movimientos.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CuentasService } from './cuentas.service';
import { Cuenta } from './entities/cuenta.entity';


@Resolver()
export class CuentasResolver {
  constructor(private readonly cuentasService:  CuentasService) {}

  @Query(() =>[Cuenta] , {name:'cuentas'})
  async consultarMovimientos(
    @Args('usuarioId', { nullable: true }) usuarioId?: string,
    @Args('tipo', { nullable: true }) tipo?: string,
    @Args('numero', { nullable: true }) numero?: string,
    @Args('fechaInicio', { nullable: true }) fechaInicio?: string,
    @Args('fechaFin', { nullable: true }) fechaFin?: string,
  ) {
    const filtros = {
      usuarioId,
      tipo,
      numero,
      fechaInicio,
      fechaFin,
    };

    return this.cuentasService.consultarMovimientos(filtros);
  }
}
