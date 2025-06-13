import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { User } from './Users.entity';

@Entity('Hairs')
export class Hairs extends BaseModel {
  @Column()
  color: string;

  @Column()
  type: string;

  @Column('uuid')
  userId: string;

  @OneToOne(() => User, (e) => e.hair, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  users: User;
}
