import { Module } from '@nestjs/common';
import { CuentasResolver } from './cuentas.resolver';
import { CuentasService } from './cuentas.service';

@Module({
  providers: [CuentasResolver, CuentasService],
})
export class CuentasModule {}
