/* eslint-disable max-classes-per-file */
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class DefaultModel {
  @Column({ nullable: true, default: null, type: 'uuid' })
  createdBy!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ nullable: true, default: null, type: 'uuid' })
  updatedBy!: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @VersionColumn({ default: 1 })
  updateCount!: number;
}

export abstract class ParanoidDefaultModel extends DefaultModel {
  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt!: Date;

  @Column({ nullable: true, default: null, type: 'uuid' })
  deletedBy!: string;
}
