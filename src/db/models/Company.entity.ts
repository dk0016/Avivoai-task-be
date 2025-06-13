import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { User } from './Users.entity';
import { CompanyAddresses } from './CompanyAddress.entity';

@Entity('Companies')
export class Companies extends BaseModel {
  @Column()
  department: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  addressId: string;

  @OneToOne(() => CompanyAddresses, (e) => e.company, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'addressId' })
  address: CompanyAddresses;

  @OneToOne(() => User, (e) => e.company, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  users: User;
}
