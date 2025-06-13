import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { User } from './Users.entity';

@Entity('Banks')
export class Banks extends BaseModel {
  @Column()
  cardExpire: string;

  @Column()
  cardNumber: string;

  @Column()
  cardType: string;

  @Column()
  currency: string;

  @Column()
  iban: string;

  @Column('uuid')
  userId: string;

  @OneToOne(() => User, (e) => e.crypto, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  users: User;
}
