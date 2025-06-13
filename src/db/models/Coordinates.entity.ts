import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { Addresses } from './Address.entity';

@Entity('Cordinates')
export class Coordinates extends BaseModel {
  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column('uuid')
  addressId: string;

  @OneToOne(() => Addresses, (e) => e.coordinates, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'addressId' })
  address: Addresses;
}
