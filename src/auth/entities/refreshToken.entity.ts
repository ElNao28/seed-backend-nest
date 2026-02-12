import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'token_hash',
  })
  tokenHash: string;

  @Column({
    default: false,
  })
  revoked: boolean;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
    name: 'expires_at',
  })
  expiresAt: Date;

  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;

  @ManyToOne(() => User, (user) => user.refreshsTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
