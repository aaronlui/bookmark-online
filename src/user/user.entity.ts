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
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column()
  email: string;

  @ApiProperty({ description: '注册时间' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_time',
  })
  createdTime: Date;

  @ApiProperty({ description: '更新时间' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_time',
  })
  updatedTime: Date;

  @ApiProperty({ description: '是否启用' })
  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @ApiProperty({ description: '是否管理员' })
  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

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
