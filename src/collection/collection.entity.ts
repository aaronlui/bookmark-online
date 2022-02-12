import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collection {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '标题' })
  @Column()
  title: string;

  @ApiProperty({ description: '描述' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: '链接' })
  @Column()
  url: string;

  @ApiProperty({ description: 'favicon' })
  @Column()
  icon?: string;

  @ApiProperty({ description: '创建时间' })
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

  @ManyToOne(() => User, (user) => user.collections)
  owner: User;
}
