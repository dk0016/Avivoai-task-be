import { Entity, Column, OneToOne } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { User } from './Users.entity';
import { Companies } from './Company.entity';
import { CompanyCordinates } from './CompanyCordinates.entity';

@Entity('CompanyAddresses')
export class CompanyAddresses extends BaseModel {
  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  stateCode: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @OneToOne(() => CompanyCordinates, (e) => e.address, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  coordinates: CompanyCordinates;

  @OneToOne(() => User, (e) => e.address, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  users: User;

  @OneToOne(() => Companies, (e) => e.address, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  company: Companies;
}
