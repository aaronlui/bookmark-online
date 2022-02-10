import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Collection } from 'src/collection/collection.entity';

@Entity()
export class User {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ length: 500 })
  username: string;

  @ApiProperty({ description: '密码' })
  @Exclude()
  @Column({ length: 500 })
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 500 })
  email: string;

  @ApiProperty({ description: '注册时间' })
  @Column({ length: 500 })
  createdTime: string;

  @ApiProperty({ description: '账号状态' })
  @Column({ default: 1, name: 'is_active' })
  isActive?: number;

  @ApiProperty({ description: '是否管理员' })
  @Column({ default: 0, name: 'is_admin' })
  isAdmin?: number;

  @OneToMany(() => Collection, (collection) => collection.owner, {
    cascade: true,
  })
  collections: Collection[];

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
