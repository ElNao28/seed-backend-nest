import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { RefreshToken } from './refreshToken.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname',
  })
  lastname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'second_lastname',
    nullable: true,
  })
  secondLastname?: string;

  @ApiProperty()
  @Column({
    type: 'date',
  })
  birthdate: Date;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  phone: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    default: true,
  })
  status: boolean;

  @ApiProperty()
  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;

  @ApiProperty({ type: () => Role, isArray: true })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshsTokens: RefreshToken[];
}
