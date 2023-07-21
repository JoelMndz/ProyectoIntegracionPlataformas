import { ObjectType, Field, Int,Float, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'filtros'})
@ObjectType()
export class Filtro {
    @Column()
    @Field(() => String)
    usuarioId: string;

    @Column()
    @Field(() => String)
    numero: string;

    @Column()
    @Field(() => String)
    tipo: string;

    @Column()
    @Field(() => String)
    fechaInicio: string;

    @Column()
    @Field(() => String)
    fechaFin: string;

}