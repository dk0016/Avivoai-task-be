import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { Addresses } from './Address.entity';
import { Banks } from './Bank.entity';
import { Hairs } from './Hair.entity';
import { Companies } from './Company.entity';
import { Cryptos } from './Crypto.entity';

@Entity('Users')
export class User extends BaseModel {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  maidenName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  birthDate: string;

  @Column()
  image: string;

  @Column()
  bloodGroup: string;

  @Column('float')
  height: number;

  @Column('float')
  weight: number;

  @Column()
  eyeColor: string;

  @Column()
  ip: string;

  @Column()
  macAddress: string;

  @Column()
  university: string;

  @Column()
  ein: string;

  @Column()
  ssn: string;

  @Column()
  userAgent: string;

  @Column()
  role: string;

  @Column('uuid')
  addressId: string;

  @OneToOne(() => Hairs, (e) => e.users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  hair: Hairs;

  @OneToOne(() => Cryptos, (e) => e.users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  crypto: Cryptos;

  @OneToOne(() => Banks, (e) => e.users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  bank: Banks;

  @OneToOne(() => Companies, (e) => e.users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  company: Companies;

  @OneToOne(() => Addresses, (e) => e.users, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'addressId' })
  address: Addresses;
}
