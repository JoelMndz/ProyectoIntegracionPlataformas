import { ObjectType, Field, Int,Float, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'cuentas'})
@ObjectType()
export class Cuenta {
  
    @PrimaryGeneratedColumn('uuid')
    @Field(()=> ID)
    _id:string;
    
    @Column()
    @Field(() => String)
    numero: string;

    @Column()
    @Field(() => String)
    titular: string;

    @Column()
    @Field(() => String)
    usuarioId: string;

    @Column()
    @Field(() => String)
    tipo: string;

    @Column()
    @Field(() => Float)
    saldo: number;

    @Column()
    @Field(() => [Movimiento])
    movimientos: Movimiento[];

    @Column()
    @Field(() => Boolean)
    activa: boolean;

    @Column()
    @Field(() => String )
    fechaCreacion: string;
}

@ObjectType()
export class Movimiento {

  @Field(() => String)
  numero: string;

  @Field(() => Float)
  monto: number;

  @Field(() => String)
  tipo: string;

  @Field(() => String)
  fecha: string;

  @Field(() => String)
  nombreBeneficiario: string;

  @Field(() => String)
  cuentaBeneficiario: string;

  @Field(() => Float)
  saldoDisponible: number;

  @Field(() => String)
  descripcion: string;

  @Field(() => String)
  email: string;
}

