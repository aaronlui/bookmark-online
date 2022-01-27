import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

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
  @Column({ default: true })
  isActive?: boolean;

  @ApiProperty({ description: '是否管理员' })
  @Column({ default: false })
  isAdmin?: boolean;

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
