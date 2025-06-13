import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { User } from './Users.entity';

@Entity('Cryptos')
export class Cryptos extends BaseModel {
  @Column()
  coin: string;

  @Column()
  wallet: string;

  @Column()
  network: string;

  @Column('uuid')
  userId: string;

  @OneToOne(() => User, (e) => e.crypto, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  users: User;
}
