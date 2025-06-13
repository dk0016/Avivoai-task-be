import { Entity, Column, OneToOne } from 'typeorm';
import { Coordinates } from './Coordinates.entity';
import { BaseModel } from './abstract/BaseModel';
import { User } from './Users.entity';
import { Companies } from './Company.entity';

@Entity('Addresses')
export class Addresses extends BaseModel {
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

  @OneToOne(() => Coordinates, (e) => e.address, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  coordinates: Coordinates;

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
