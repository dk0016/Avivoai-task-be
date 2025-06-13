import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { CompanyAddresses } from './CompanyAddress.entity';

@Entity('CompanyCordinates')
export class CompanyCordinates extends BaseModel {
  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column('uuid')
  addressId: string;

  @OneToOne(() => CompanyAddresses, (e) => e.coordinates, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'addressId' })
  address: CompanyAddresses;
}
